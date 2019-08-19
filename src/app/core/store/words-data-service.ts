import {EntityCollectionDataService, QueryParams} from "@ngrx/data";
import {Word, WordsService} from "../../api";
import {Optional} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Update} from "@ngrx/entity";

export class WordsDataService implements EntityCollectionDataService<Word> {
    name: string;

    // TestBed bug requires `@Optional` even though http is always provided.
    constructor(
        @Optional() private http: HttpClient,
        private service: WordsService
    ) {
        if (!http) {
            throw new Error('Where is HttpClient?');
        }
        this.name = 'Words custom data service';
    }

    add(entity: Word): Observable<Word> {
        return this.service.add(entity);
    }

    delete(id: any): Observable<number | string> {
        return this.service._delete(id);
    }

    getAll(): Observable<Word[]> {
        return this.service.getList();
    }

    getById(id: any): Observable<Word> {
        throw new Error('not implemented');
    }

    getWithQuery(params: string | QueryParams): Observable<Word[]> {
        throw new Error('not implemented');
    }

    update(update: Update<Word>): Observable<Word> {
        return this.service.update(<number>update.id, <Word>update.changes);
    }

    upsert(entity: Word): Observable<Word> {
        throw new Error('not implemented');
    }
}
