import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {WordsService} from '../../words.service';
import {Word} from "../../../core/domain/words/word";
import {untilDestroyed} from "ngx-take-until-destroy";

@Component({
    selector: 'app-words-page',
    templateUrl: './words-page.component.html',
    styleUrls: ['./words-page.component.scss']
})
export class WordsPageComponent implements OnInit, OnDestroy {
    words: Observable<Word[]>;

    constructor(
        private wordsService: WordsService
    ) {
    }

    ngOnInit() {
        this.wordsService.load().pipe(untilDestroyed(this)).subscribe();
        this.words = this.wordsService.getList();
    }

    ngOnDestroy() { }
}
