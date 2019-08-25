import {Injectable} from '@angular/core';
import {Word} from '../../api';
import {EntityCollectionService, EntityCollectionServiceFactory} from "@ngrx/data";
import {EntityRepository} from "../domain/interfaces/entity-repository";

@Injectable({
    providedIn: 'root'
})
export class WordsNgrxRepository extends EntityRepository<Word> {
    service: EntityCollectionService<Word>;

    constructor(factory: EntityCollectionServiceFactory) {
        super();
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
