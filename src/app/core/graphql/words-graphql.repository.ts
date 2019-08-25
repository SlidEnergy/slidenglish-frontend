import {Injectable} from '@angular/core';
import {Word} from '../../api';
import * as api from '../../api'
import {AppState} from "../store/app-state";
import {Store} from "@ngrx/store";
import {EntityRepository} from "../domain/interfaces/entity-repository";
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class WordsGraphqlRepository extends EntityRepository<Word> {
    constructor(
        private apollo: Apollo
    ) {
        super();
    }

    get entities() {
        return this.load();
    }

    load() {
        return this.apollo.query<{ words: Word[] }>({
            query: gql`
                {
                    words {
                        id
                        text
                        association
                        description
                        synonyms {
                            id
                            text
                        }
                    }
                }
            `
        }).pipe(
            map(result => result.data && result.data.words),
        );
    }

    add(word: Word) {
        return this.apollo.mutate<{ words: Word }>({
            mutation: gql`
                mutation($word: wordInput!) {
                    addWord(word: $word) {
                        id
                        text
                        association
                        description
                        synonyms {
                            id
                            text
                        }
                    }
                }
            `,
            variables: { word }
        }).pipe(
            map(result => result.data && result.data.words),
        );
    }

    update(id: number, word: Word) {
        return this.apollo.mutate<{ words: Word }>({
            mutation: gql`
                mutation($word: wordInput!) {
                    updateWord(word: $word) {
                        id
                        text
                        association
                        description
                        synonyms {
                            id
                            text
                        }
                    }
                }
            `,
            variables: { word }
        }).pipe(
            map(result => result.data && result.data.words),
        );
    }

    delete(id: number) {
        return this.apollo.mutate<{ words: Word }>({
            mutation: gql`
                mutation($id: Int!) {
                    deleteWord (id: $id)
                }
            `,
            variables: { id }
        }).pipe(
            map(result => result.data && result.data.words),
        );
    }
}
