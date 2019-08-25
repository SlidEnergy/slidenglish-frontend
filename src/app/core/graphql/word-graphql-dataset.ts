import {Word} from "../domain/words/word";
import * as api from '../../api';
import {Injectable} from "@angular/core";
import {EntityRepository} from "../domain/interfaces/entity-repository";
import {EntityDataSet} from "../domain/interfaces/entity-dataset";

@Injectable()
export class WordGraphqlDataset extends EntityDataSet<Word> {
    constructor(private repository: EntityRepository<Word>) {
        super();
    }

    entities = this.repository.entities;

    load() {
        return this.repository.load();
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
        return Object.assign(<api.Word>{}, word, {synonyms: word.synonyms && word.synonyms.map(x => x.id)});
    }
}
