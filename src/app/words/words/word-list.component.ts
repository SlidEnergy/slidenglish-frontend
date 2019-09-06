import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {Router} from '@angular/router';

import {Word} from "../../core/domain/words/word";
import {WordsService} from "../words.service";
import {catchError, map, mapTo, switchMap, tap} from "rxjs/operators";
import {showError, showSuccess} from "../../shared/utils/message-utils";
import {ExampleOfUse, RelationAttribute} from "src/app/api";
import {WordRelation} from "../../core/domain/words/word-relation";

@Component({
    selector: 'app-word-list',
    templateUrl: './word-list.component.html',
    styleUrls: ['./word-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordListComponent implements OnInit {
    @Input() words: Word[];

    constructor(
        private router: Router,
        private wordsService: WordsService
    ) {
        this.getFilteredWords = this.getFilteredWords.bind(this);
    }

    ngOnInit() {
    }

    grid_rowClick(event: { data: Word }) {
        this.router.navigate(['words', event.data.id]);
    }

    grid_onInitNewRow(event: {data: any}) {
        event.data = new Word();
    }

    grid_rowRemoving(event: { data: Word, cancel: Promise<boolean> }) {
        event.cancel = this.wordsService.delete(event.data.id).pipe(
            mapTo(false),
            catchError(error => {
                console.error(error);
                showError('Не удалось удалить слово');
                return of(true);
            })
        ).toPromise();
    }

    grid_rowRemoved() {
        showSuccess('Слово удалено');
    }

    grid_rowUpdating(event: {oldData: Word, newData: { relatedLexicalUnits?: WordRelation[], examplesOfUse?: ExampleOfUse[] | string}, cancel: Promise<boolean>}) {
        let createNewRelations$ = of<WordRelation[]>([]);

        const word = Object.assign(event.oldData, event.newData);

        if(event.newData.examplesOfUse && typeof event.newData.examplesOfUse === 'string')
            word.examplesOfUse = event.newData.examplesOfUse.split('\n').map(x=> ({ example: x }));

        let relationsToAdd = event.newData.relatedLexicalUnits ? event.newData.relatedLexicalUnits.filter(x => !x.word.id) : [];

        let hasNewRelatedLexicalUnits = relationsToAdd.length > 0;

        if(hasNewRelatedLexicalUnits) {
            createNewRelations$ = this.createRelatedLexicalUnits(relationsToAdd).pipe(
                tap(relations => word.relatedLexicalUnits = event.newData.relatedLexicalUnits.map(x=> !x.word.id ? relations.find(r => r.word.text = x.word.text) : x))
            );
        }

        event.cancel = createNewRelations$.pipe(
            switchMap(x=> this.wordsService.update(word.id, word)),
            mapTo(false),
            catchError(error => {
                console.error(error);
                showError('Не удалось изменить слово');
                return of(true);
            })
        ).toPromise();
    }

    grid_rowUpdated(event) {
        showSuccess('Слово изменено');
    }

    createRelatedLexicalUnits(relations: WordRelation[]): Observable<WordRelation[]> {
        if(!relations || relations.length == 0)
            return of<WordRelation[]>();

        // Поток создания новых синонимов
        return forkJoin(relations
                .map(x => this.wordsService.add(x.word).pipe(map(newWord => ({
                    wordId: newWord.id,
                    word: newWord,
                    attribute: x.attribute
                })))));
    }

    grid_rowInserting(event: { data: any, cancel: Promise<boolean> }) {
        let createNewRelations$ = of<WordRelation[]>([]);

        const word = event.data;

        if(event.data.examplesOfUse && typeof event.data.examplesOfUse === 'string')
            word.examplesOfUse = event.data.examplesOfUse.split('\n').map(x=> ({ example: x }));

        if(event.data.relatedLexicalUnits || event.data.relatedLexicalUnits.length > 0) {
            createNewRelations$ = this.createRelatedLexicalUnits(event.data.relatedLexicalUnits).pipe(
                tap(newRelations => word.relatedLexicalUnits = newRelations),
            );
        }

        event.cancel = createNewRelations$.pipe(
            switchMap(x=> this.wordsService.add(word)),
            mapTo(false),
            catchError(error => {
                console.error(error);
                showError('Не удалось добавить слово');
                return of(true);
            })
        ).toPromise();
    }

    grid_rowInserted() {
        showSuccess('Слово добавлено');
    }

    tagBox_customItemCreating = (event) => {
        event.customItem = { word: new Word({ text: event.text }), attribute: RelationAttribute.None };
    };

    calculateExamplesOfUse = (rowData: Word | { examplesOfUse: string }) => {
        if(!rowData.examplesOfUse)
            return '';

        if(typeof rowData.examplesOfUse === 'string')
            return rowData.examplesOfUse;

        return rowData.examplesOfUse.map(x=>x.example).reduce((acc, value) => acc == '' ? value : acc + '\n' + value, '');
    };

    selectionChanged(e) {
        // e.component.collapseAll(-1);
        // e.component.expandRow(e.currentSelectedRowKeys[0]);
    }

    getFilteredWords(options) {
        if (this.words && options.data) {
            let words = this.words
                .filter(x =>
                    x.id !== options.data.id &&
                    (!options.data.relatedLexicalUnits || !options.data.relatedLexicalUnits.map(s => s.id).includes(x.id)));

            let dataSource = [];
            for(let word of words) {
                dataSource.push(...Object.keys(RelationAttribute).map(x=> ({ word, attribute: x})));
            }

            return dataSource;
        }
        else
            return [];
    }

    displayRelatedLexicalUnit = (item) => {
        if(!item)
            return '';

        if(item.attribute == RelationAttribute.None)
            return item.word.text;

        return item.word.text + ' (' + item.attribute + ')';
    }
}
