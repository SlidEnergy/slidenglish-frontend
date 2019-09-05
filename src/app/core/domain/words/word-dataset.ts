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
        return Object.assign(<api.LexicalUnit>{}, word, {
            relatedLexicalUnits: word.relatedLexicalUnits && word.relatedLexicalUnits.map(x => ({
                lexicalUnitId: x.word.id,
                attribute: x.attribute
            }))
        });
    }

    toDomain(word: api.LexicalUnit, list: api.LexicalUnit[]) {
        let relatedLexicalUnits = !word.relatedLexicalUnits ? [] :
            word.relatedLexicalUnits.map(x => ({
                word: Object.assign(<Word>{}, list.find(item => item.id == x.lexicalUnitId)),
                attribute: x.attribute
            }));

        return Object.assign(<Word>{}, word, { relatedLexicalUnits });
    }
}
