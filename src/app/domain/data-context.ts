import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {WordsService} from "../api";
import {Word} from "./words/word";
import {map} from "rxjs/operators";
import {DataSet} from "./words/dataset";

@Injectable()
export class DataContext {

    constructor(public words:DataSet<Word>,
        private wordsService: WordsService
    ) {
    }

}
