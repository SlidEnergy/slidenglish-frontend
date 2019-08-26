import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from "../../api";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from "rxjs/operators";
import {DxTextAreaComponent} from "devextreme-angular";
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
    selector: 'app-translate-page',
    templateUrl: './translate-page.component.html',
    styleUrls: ['./translate-page.component.scss']
})
export class TranslatePageComponent implements OnInit, OnDestroy {
    @ViewChild('inputTextArea', { static: true }) inputTextArea: DxTextAreaComponent;
    text: string;
    translatedText: Observable<string>;

    constructor(private translate: TranslateService) { }

    ngOnInit() {
        this.translatedText = this.inputTextArea.onValueChanged.pipe(
            untilDestroyed(this),
            debounceTime(800),
            distinctUntilChanged(),
            switchMap(x=> this.translate.translate({ text: this.text }).pipe(
                map(x=> x.text)
            ))
        );
    }

    ngOnDestroy() { }
}
