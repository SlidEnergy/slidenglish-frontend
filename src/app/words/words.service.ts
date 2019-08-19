import { Injectable } from '@angular/core';
import * as api from '../api'
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Word} from "../core/domain/words/word";
import {DataContext} from "../core/domain/data-context";

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private context: DataContext) { }

  load() {
      return this.context.words.load();
  }

  getList(): Observable<Word[]> {
    return this.context.words.entities;
  }

  add(word: Word) {
    return this.context.words.add(word);
  }

  update(id: number, word: Word) {
      return this.context.words.update(id, word);
  }

  delete(id: number) {
      return this.context.words.delete(id);
  }
}
