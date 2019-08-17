import { Injectable } from '@angular/core';
import * as api from '../api'
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Word} from "../domain/words/word";
import {DataContext} from "../domain/data-context";

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private context: DataContext) { }

  getList(): Observable<Word[]> {
    return this.context.words.getList();
  }

  add(word: api.Word) {
    return this.context.words.add(word);
  }

  update(id: number, word: api.EditWordDto) {
      return this.context.words.update(id, word);
  }

  delete(id: number) {
      return this.context.words.delete(id);
  }
}
