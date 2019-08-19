import {Injectable} from "@angular/core";
import {WordsService} from "../api";
import {WordDataSet} from "./words/word-dataset";

@Injectable()
export class DataContext {
    constructor(public words: WordDataSet,
    ) { }

}
