import {Component, OnDestroy, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {ImportService} from "../../api";
import {untilDestroyed} from "ngx-take-until-destroy";
import {showError, showSuccess} from "../../shared/utils/message-utils";

@Component({
    selector: 'app-import-page',
    templateUrl: './import-page.component.html',
    styleUrls: ['./import-page.component.scss']
})
export class ImportPageComponent implements OnInit, OnDestroy {
    text: string;

    constructor(private importService: ImportService) {
    }

    ngOnInit() {
    }

    import(event) {
        this.importService._import({text: this.text}).pipe(untilDestroyed(this)).subscribe(
            value => {
                this.text = '';
                showSuccess('Слова добавлены');
            },
            error => {
                console.error(error);
                showError(error);
            }
        );
    }

    ngOnDestroy(): void {
    }
}
