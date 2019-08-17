import {Observable} from "rxjs";
import {WordsService} from "../../api";
import {map} from "rxjs/operators";
import {Word} from "./word";
import * as api from '../../api';
import {Injectable} from "@angular/core";

@Injectable()
export class DataSet<T> {
    constructor(private service: WordsService) {
    }
    getList() {
        return this.service.getList()
            .pipe(
                map(list=> list
                    .map(word => Object.assign(<Word>{}, word, { synonyms: list.filter(x => word.synonyms.includes(x.id))}))
                )
            );
    }

    add(word: api.Word) {
        return this.service.add(word);
    }

    update(id: number, word: api.EditWordDto) {
        return this.service.update(id, word);
    }

    delete(id: number) {
        return this.service._delete(id);
    }
}
