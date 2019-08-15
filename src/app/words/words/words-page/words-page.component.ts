import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/api';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { map, catchError } from 'rxjs/operators';
import {WordsService} from '../../../core/services/words.service';

@Component({
  selector: 'app-words-page',
  templateUrl: './words-page.component.html',
  styleUrls: ['./words-page.component.scss']
})
export class WordsPageComponent implements OnInit {
  words: Observable<Word[]>;

  constructor(
    private wordsService: WordsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.words = this.wordsService.getList();
  }

  addItem = (item: Word) => {
    return this.wordsService.add(item).pipe(
      map((result) => {
        this.snackBar.open('Банк привязан', undefined, { duration: 5000, panelClass: ['background-green'] });
        return result;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось привязать банк', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  };

  deleteItem = (item: Word) => {
    return this.wordsService.delete(item.id).pipe(
      map((result) => {
        this.snackBar.open('Слово удалено', undefined, { duration: 5000, panelClass: ['background-green'] });
        return true;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось удалить слово', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  };

  editItem = (item: Word) => {
    return this.wordsService.update(item.id, item).pipe(
      map((result) => {
        this.snackBar.open('Слово изменено', undefined, { duration: 5000, panelClass: ['background-green'] });
        return result;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось изменить слово', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  };
}
