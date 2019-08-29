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
        return this.repository.add(this.toApi(word));
    }

    update(id: number, word: Word) {
        return this.repository.update(id, this.toApi(word));
    }

    delete(id: number) {
        return this.repository.delete(id);
    }

    toApi(word: Word) {
        return Object.assign(<api.LexicalUnit>{}, word, {synonyms: word.relatedLexicalUnits && word.relatedLexicalUnits.map(x => x.id)});
    }

    toDomain(word: api.LexicalUnit, list: api.LexicalUnit[]) {
        return Object.assign({}, word, { relatedLexicalUnit: list.filter(x => word.relatedLexicalUnits.map(unit => unit.lexicalUnitId).includes(x.id))});
    }
}
