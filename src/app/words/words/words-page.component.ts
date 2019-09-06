import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {WordsService} from '../words.service';
import {Word} from "../../core/domain/words/word";
import {switchMap} from "rxjs/operators";

@Component({
    selector: 'app-words-page',
    templateUrl: './words-page.component.html',
    styleUrls: ['./words-page.component.scss']
})
export class WordsPageComponent implements OnInit {
    words: Observable<Word[]>;

    constructor(
        private wordsService: WordsService
    ) {
    }

    ngOnInit() {
        this.words = this.wordsService.load().pipe(switchMap(x=> this.wordsService.getList()));
    }
}
