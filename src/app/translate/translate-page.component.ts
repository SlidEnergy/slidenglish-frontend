import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from "../api";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-translate-page',
    templateUrl: './translate-page.component.html',
    styleUrls: ['./translate-page.component.scss']
})
export class TranslatePageComponent implements OnInit, OnDestroy {
    text: string;
    translatedText: Observable<string>;

    constructor(private translateService: TranslateService) {
    }

    ngOnInit() {
    }

    translate(event) {
        this.translatedText = this.translateService.translate({text: this.text}).pipe(
            map(x => x.text)
        );
    }

    ngOnDestroy() {
    }
}
