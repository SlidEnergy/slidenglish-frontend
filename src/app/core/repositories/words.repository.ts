import {Injectable} from '@angular/core';
import {LexicalUnit} from '../../api';
import * as api from '../../api'
import {AppState} from "../store/app-state";
import {Store} from "@ngrx/store";

@Injectable({
    providedIn: 'root'
})
export class WordsRepository {
    constructor(
        private service: api.LexicalUnitsService,
        private store: Store<AppState>
    ) { }

    entities = this.store.select('words');

    load() {
        return this.service.getList();
    }

    add(word: LexicalUnit) {
        return this.service.add(word);
    }

    update(id: number, word: LexicalUnit) {
        return this.service.update(id, word);
    }

    delete(id: number) {
        return this.service._delete(id);
    }
}
