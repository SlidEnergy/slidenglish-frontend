import {EntityCollectionDataService, QueryParams} from "@ngrx/data";
import {LexicalUnit, LexicalUnitsService} from "../../api";
import {Optional} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Update} from "@ngrx/entity";

export class WordsDataService implements EntityCollectionDataService<LexicalUnit> {
    name: string;

    // TestBed bug requires `@Optional` even though http is always provided.
    constructor(
        @Optional() private http: HttpClient,
        private service: LexicalUnitsService
    ) {
        if (!http) {
            throw new Error('Where is HttpClient?');
        }
        this.name = 'Words custom data service';
    }

    add(entity: LexicalUnit): Observable<LexicalUnit> {
        return this.service.add(entity);
    }

    delete(id: any): Observable<number | string> {
        return this.service._delete(id);
    }

    getAll(): Observable<LexicalUnit[]> {
        return this.service.getList();
    }

    getById(id: any): Observable<LexicalUnit> {
        throw new Error('not implemented');
    }

    getWithQuery(params: string | QueryParams): Observable<LexicalUnit[]> {
        throw new Error('not implemented');
    }

    update(update: Update<LexicalUnit>): Observable<LexicalUnit> {
        return this.service.update(<number>update.id, <LexicalUnit>update.changes);
    }

    upsert(entity: LexicalUnit): Observable<LexicalUnit> {
        throw new Error('not implemented');
    }
}
