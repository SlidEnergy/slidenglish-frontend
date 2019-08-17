import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import * as api from 'src/app/api';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

import query from "devextreme/data/query";
import {Word} from "../../../domain/words/word";

@Component({
    selector: 'app-word-list',
    templateUrl: './word-list.component.html',
    styleUrls: ['./word-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordListComponent implements OnInit {
    @Input() words: Word[];
    @Input() itemAdding: (item: api.EditWordDto) => Observable<Word>;
    @Input() itemUpdating: (item: api.Word) => Observable<Word>;
    @Input() itemDeleting: (item: api.Word) => Observable<boolean>;

    constructor(
        private router: Router
    ) {
        this.getFilteredWords2 = this.getFilteredWords2.bind(this);
    }

    ngOnInit() {
    }

    grid_rowClick(event) {
        this.router.navigate(['words', event.data.id]);
    }

    grid_rowRemoving(event) {
        this.itemDeleting(event.data).subscribe();
    }

    grid_rowUpdating(event) {
        this.itemUpdating({ ...event.oldData, ...event.newData }).subscribe();
    }

    grid_rowInserting(event) {
        this.itemAdding(event.data).subscribe();
    }

    tagBox_customItemCreating = (event) => {
        let newWord: api.EditWordDto = { text: event.text };
        this.words.unshift(<Word>newWord);
        this.itemAdding(newWord).subscribe();
        event.customItem = newWord;
    }

    selectionChanged(e) {
        e.component.collapseAll(-1);
        e.component.expandRow(e.currentSelectedRowKeys[0]);
    }

    getFilteredWords (word: Word) {
        return query(this.words)
            .filter(x => x.text !== word.text)
            .sortBy("text", true)
            .toArray();
    }

    getFilteredWords2(options) {
        if(this.words && options.data)
            return this.words.filter(x => x.id !== options.data.id && !options.data.synonyms.map(s => s.id).includes(x.id));
        else
            return [];
    }
}
