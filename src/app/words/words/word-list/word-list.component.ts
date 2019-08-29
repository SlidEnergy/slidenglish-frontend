import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import * as api from 'src/app/api';
import {forkJoin, iif, of} from 'rxjs';
import {Router} from '@angular/router';

import query from "devextreme/data/query";
import {Word} from "../../../core/domain/words/word";
import {WordsService} from "../../words.service";
import {exhaustMap, filter, map, switchMap, tap} from "rxjs/operators";
import {showError, showSuccess} from "../../../shared/utils/message-utils";

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
        this.getFilteredWords2 = this.getFilteredWords2.bind(this);
    }

    ngOnInit() {
    }

    grid_rowClick(event) {
        this.router.navigate(['words', event.data.id]);
    }

    grid_rowRemoving(event) {
        this.wordsService.delete(event.data.id).subscribe(
            value => showSuccess('Слово удалено'),
            error => showError('Не удалось удалить слово'));
    }

    grid_rowUpdating(event) {
        let hasNewSynonyms = event.newData.synonyms && event.newData.synonyms.filter(x => x.id === undefined).length > 0;

        // Поток создания новых синонимов
        let createNewSynonyms = of(filter(() => hasNewSynonyms))
            .pipe(
                // Дожидаемся создания всех слов на сервере
                exhaustMap(value => forkJoin(event.newData.synonyms.filter(x => x.id === undefined).map(x => this.wordsService.add((x))))),
                // Добавляем новые слова в коллекцию
                tap((newSynonyms: Word[]) => newSynonyms.forEach(x => this.words.push(x)))
            );

        // Если нужно создавать синонимы, создаем их, иначе переходим к обновлению сущности
        iif(() => hasNewSynonyms,
            // then
            createNewSynonyms.pipe(map((newSynonyms: Word[]) => this.addNewSynonyms(this.getResultEntity(event), newSynonyms))),
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

    addNewSynonyms(entity: Word, newSynonyms) {
        return Object.assign(entity, {synonyms: [...entity.relatedLexicalUnits.filter(x => x.id), ...newSynonyms]});
    }

    getResultEntity<T>(event) {
        return Object.assign(<T>{}, event.oldData, event.newData);
    }

    grid_rowInserting(event) {
        this.wordsService.add(event.data)
            .subscribe(
                value => showSuccess('Слово добавлено'),
                error => showError('Не удалось добавить слово')
            );
    }

    tagBox_customItemCreating = (event) => {
        let newWord: api.LexicalUnit = {text: event.text};
        event.customItem = newWord;
    }

    selectionChanged(e) {
        e.component.collapseAll(-1);
        e.component.expandRow(e.currentSelectedRowKeys[0]);
    }

    getFilteredWords2(options) {
        if (this.words && options.data)
            return this.words.filter(x => x.id !== options.data.id && (!options.data.synonyms || !options.data.synonyms.map(s => s.id).includes(x.id)));
        else
            return [];
    }
}
