import {Injectable} from "@angular/core";
import {WordDataSet} from "./words/word-dataset";
import {EntityDataSet} from "./interfaces/entity-dataset";
import {Word} from "./words/word";

@Injectable()
export class DataContext {
    constructor(
        public words: EntityDataSet<Word>
    ) { }

}
