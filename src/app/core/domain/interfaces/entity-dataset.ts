import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export abstract class EntityDataSet<T> {
    abstract entities : Observable<T[]>;
    abstract load(): Observable<T[]>;
    abstract add(word: T) : Observable<T>;
    abstract update(id: number, word: T) : Observable<T>;
    abstract delete(id: number) : Observable<any>;
}
