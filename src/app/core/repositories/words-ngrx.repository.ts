import {Injectable} from '@angular/core';
import {Word} from '../../api';
import {EntityCollectionService, EntityCollectionServiceFactory} from "@ngrx/data";

@Injectable({
    providedIn: 'root'
})
export class WordsNgrxRepository {
    service: EntityCollectionService<Word>;

    constructor(factory: EntityCollectionServiceFactory) {
        this.service = factory.create<Word>('Word');
    }

    get entities() {
        return this.service.entities$;
    }

    load() {
        return this.service.load();
    }

    add(word: Word) {
        return this.service.add(word);
    }

    update(id: number, word: Word) {
        return this.service.update(word);
    }

    delete(id: number) {
        return this.service.delete(id);
    }
}
