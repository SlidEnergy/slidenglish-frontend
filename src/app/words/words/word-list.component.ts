import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import * as api from 'src/app/api';
import {forkJoin, iif, of} from 'rxjs';
import {Router} from '@angular/router';

import query from "devextreme/data/query";
import {Word} from "../../core/domain/words/word";
import {WordsService} from "../words.service";
import {exhaustMap, filter, map, switchMap, tap} from "rxjs/operators";
import {showError, showSuccess} from "../../shared/utils/message-utils";
import {RelationAttribute} from "src/app/api";

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

    grid_rowRemoving(event: { data: Word }) {
        this.wordsService.delete(event.data.id).subscribe(
            value => showSuccess('Слово удалено'),
            error => showError('Не удалось удалить слово'));
    }

    grid_rowUpdating(event) {
        let hasNewRelatedLexicalUnits = event.newData.relatedLexicalUnits && event.newData.relatedLexicalUnits.filter(x => x.word.id === undefined).length > 0;

        // Поток создания новых синонимов
        let createRelatedLexicalUnits = of(filter(() => hasNewRelatedLexicalUnits))
            .pipe(
                // Дожидаемся создания всех слов на сервере
                exhaustMap(value => forkJoin(event.newData.relatedLexicalUnits.filter(x => x.word.id === undefined).map(x => this.wordsService.add((x.word))))),
                // Добавляем новые слова в коллекцию
                tap((newSynonyms: Word[]) => newSynonyms.forEach(x => this.words.push(x)))
            );

        // Если нужно создавать синонимы, создаем их, иначе переходим к обновлению сущности
        iif(() => hasNewRelatedLexicalUnits,
            // then
            createRelatedLexicalUnits.pipe(map((newRelatedLexicalUnits: Word[]) => this.addNewRelatedLexicalUnit(this.toEntity(this.getResultEntity(event)), newRelatedLexicalUnits))),
            // else
            of(this.getResultEntity(event))
        )
            .pipe(
                // Обновляем сущность
                switchMap(word => this.wordsService.update(word.id, word)))
            .subscribe(
                value => showSuccess('Слово изменено'),
                error => showError('Не удалось изменить слово')
            );
    }

    addNewRelatedLexicalUnit(entity: Word, newRelatedLexicalUnits) {
        return Object.assign(entity, {relatedLexicalUnits: [...entity.relatedLexicalUnits.filter(x => x.word.id), ...newRelatedLexicalUnits]});
    }

    private getResultEntity<T>(event) {
        return Object.assign(<T>{}, event.oldData, event.newData);
    }

    private toEntity(entity: any) {
        return { ...entity, examplesOfUse: entity.examplesOfUse && entity.examplesOfUse.split('\n').map(x=> ({ example: x }))};
    }

    grid_rowInserting(event) {
        this.wordsService.add(this.toEntity(event.data))
            .subscribe(
                value => showSuccess('Слово добавлено'),
                error => showError('Не удалось добавить слово')
            );
    }

    tagBox_customItemCreating = (event) => {
        let newWord: api.LexicalUnit = {text: event.text};
        event.customItem = newWord;
    }

    calculateExamplesOfUse = (rowData: Word | { examplesOfUse: string }) => {
        if(!rowData.examplesOfUse)
            return '';

        if(typeof rowData.examplesOfUse === 'string')
            return rowData.examplesOfUse;

        return rowData.examplesOfUse.map(x=>x.example).reduce((acc, value) => acc == '' ? value : acc + '\n' + value, '');
    };

    calculateRelatedLexicalUnits = (rowData: Word) => {
        return rowData.relatedLexicalUnits;
    };

    selectionChanged(e) {
        e.component.collapseAll(-1);
        e.component.expandRow(e.currentSelectedRowKeys[0]);
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
