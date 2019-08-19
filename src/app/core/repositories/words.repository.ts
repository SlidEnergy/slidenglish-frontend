import {Injectable} from '@angular/core';
import {Word} from '../../api';
import * as api from '../../api'

@Injectable({
    providedIn: 'root'
})
export class WordsRepository {
    constructor(private service: api.WordsService) {
    }

    getList() {
        return this.service.getList();
    }

    add(word: Word) {
        return this.service.add(word);
    }

    update(id: number, word: Word) {
        return this.service.update(id, word);
    }

    delete(id: number) {
        return this.service._delete(id);
    }
}
