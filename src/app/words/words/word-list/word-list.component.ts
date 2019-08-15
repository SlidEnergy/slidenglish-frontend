import {Component, OnInit, Input} from '@angular/core';
import {Word} from 'src/app/api';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'app-word-list',
    templateUrl: './word-list.component.html',
    styleUrls: ['./word-list.component.scss']
})
export class WordListComponent implements OnInit {
    @Input() words: Word[];
    @Input() itemAdding: (item: Word) => Observable<Word>;
    @Input() itemUpdating: (item: Word) => Observable<Word>;
    @Input() itemDeleting: (item: Word) => Observable<boolean>;

    constructor(
        private router: Router
    ) {
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
        this.itemUpdating({ ...event.oldData, ...event.newData }).subscribe(data => {
            let a = 4;
            a++;
        });
    }

    grid_rowInserting(event) {
        this.itemAdding(event.data).subscribe(data => {
            let a = 4;
            a++;
        });
    }
}
