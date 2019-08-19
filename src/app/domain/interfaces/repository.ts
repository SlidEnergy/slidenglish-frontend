import {Observable} from "rxjs";

export interface Repository<T> {
    getList() : Observable<T>;
    add(): Observable<T>;
    update(): Observable<T>;
    delete(): Observable<any>;
}
