import {map, withLatestFrom} from "rxjs/operators";
import {Word} from "./word";
import * as api from '../../../api';
import {Injectable} from "@angular/core";
import {EntityRepository} from "../interfaces/entity-repository";
import {EntityDataSet} from "../interfaces/entity-dataset";
import {Observable, OperatorFunction, pipe} from "rxjs";

@Injectable()
export class WordDataSet extends EntityDataSet<Word> {
    constructor(private repository: EntityRepository<api.Word>) {
        super();
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
        return this.repository.add(this.toApi(word)).pipe(this.toDomainOperator());
    }

    update(id: number, word: Word) {
        return this.repository.update(id, this.toApi(word)).pipe(this.toDomainOperator());
    }

    delete(id: number) {
        return this.repository.delete(id);
    }

    toApi(word: Word) {
        return Object.assign(<api.Word>{}, word, {synonyms: word.synonyms && word.synonyms.map(x => x.id)});
    }

    toDomain(word: api.Word, list: api.Word[]) {
        return Object.assign(<Word>{}, word, {synonyms: list.filter(x => word.synonyms.includes(x.id))});
    }

    toDomainOperator(): OperatorFunction<api.Word, Word> {
        return pipe(
            withLatestFrom<api.Word, Observable<api.Word[]>>(this.repository.entities),
            map(([word, list]) => this.toDomain(word, list)));
    }
}
