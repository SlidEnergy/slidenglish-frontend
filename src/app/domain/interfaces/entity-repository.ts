import {Observable} from "rxjs";

export abstract class EntityRepository<T> {
    abstract getList() : Observable<T[]>;
    abstract add(entity: T): Observable<T>;
    abstract update(id: number, entity: T): Observable<T>;
    abstract _delete(id: number): Observable<any>;
}
