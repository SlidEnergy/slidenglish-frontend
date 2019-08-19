import {Observable} from "rxjs";

export abstract class EntityRepository<T> {
    abstract entities: Observable<T[]>;
    abstract load() : Observable<T[]>;
    abstract add(entity: T): Observable<T>;
    abstract update(id: number, entity: T): Observable<T>;
    abstract delete(id: number): Observable<any>;
}
