import {map} from "rxjs/operators";
import {Word} from "./word";
import * as api from '../../../api';
import {Injectable} from "@angular/core";
import {EntityRepository} from "../interfaces/entity-repository";

@Injectable()
export class WordDataSet {
    constructor(private repository: EntityRepository<api.LexicalUnit>) {
    }

    entities = this.repository.entities
        .pipe(
            map(list => list.map(word => this.toDomain(word, list)))
        );

    load() {
        return this.repository.load()
            .pipe(
                map(list => list.map(word => this.toDomain(word, list)))
            );
    }

    add(word: Word) {
        return this.repository.add(word.model).pipe(map(x=>this.toDomain(x)));
    }

    update(id: number, word: Word) {
        return this.repository.update(id, word.model).pipe(map(x=>this.toDomain(x)));
    }

    delete(id: number) {
        return this.repository.delete(id);
    }

    toDomain(word: api.LexicalUnit, list?: api.LexicalUnit[]): Word {
        let apiRelatedLexicalUnits = word.relatedLexicalUnits || [];

        let relatedLexicalUnits = apiRelatedLexicalUnits.map(x => ({
                wordId: x.lexicalUnitId,
                word: list ? this.toDomain(list.find(item => item.id == x.lexicalUnitId)) : undefined,
                attribute: x.attribute
            }));

        return new Word(word, relatedLexicalUnits);
    }
}
