import {map} from "rxjs/operators";
import {Word} from "./word";
import * as api from '../../api';
import {Injectable} from "@angular/core";
import {EntityRepository} from "../interfaces/entity-repository";

@Injectable()
export class WordDataSet {
    constructor(private repository: EntityRepository<api.Word>) {
    }

    getList() {
        return this.repository.getList()
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
        return this.repository._delete(id);
    }

    toApi(word: Word) {
        return Object.assign(<api.Word>{}, word, {synonyms: word.synonyms.map(x => x.id)});
    }

    toDomain(word: api.Word, list: api.Word[]) {
        return Object.assign(<Word>{}, word, {synonyms: list.filter(x => word.synonyms.includes(x.id))});
    }
}
