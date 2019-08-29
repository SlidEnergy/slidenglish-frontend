import {Injectable} from '@angular/core';
import {LexicalUnit} from '../../api';
import {EntityCollectionService, EntityCollectionServiceFactory} from "@ngrx/data";

@Injectable({
    providedIn: 'root'
})
export class WordsNgrxRepository {
    service: EntityCollectionService<LexicalUnit>;

    constructor(factory: EntityCollectionServiceFactory) {
        this.service = factory.create<LexicalUnit>('Word');
    }

    get entities() {
        return this.service.entities$;
    }

    load() {
        return this.service.load();
    }

    add(word: LexicalUnit) {
        return this.service.add(word);
    }

    update(id: number, word: LexicalUnit) {
        return this.service.update(word);
    }

    delete(id: number) {
        return this.service.delete(id);
    }
}
