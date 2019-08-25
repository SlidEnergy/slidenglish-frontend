import {NgModule, Optional, SkipSelf} from '@angular/core';
import {WordDataSet} from "./words/word-dataset";
import {DataContext} from "./data-context";
import {EntityRepository} from "./interfaces/entity-repository";
import {WordsNgrxRepository} from "../store/words-ngrx.repository";
import {WordsGraphqlRepository} from "../graphql/words-graphql.repository";
import {EntityDataSet} from "./interfaces/entity-dataset";
import {WordGraphqlDataset} from "../graphql/word-graphql-dataset";

@NgModule({
    providers: [
        DataContext,
        [{ provide: EntityDataSet, useClass: WordGraphqlDataset }],
        [{ provide: EntityRepository, useClass: WordsGraphqlRepository }]
    ]
})
export class DomainModule {
    constructor(@Optional() @SkipSelf() parentModule: DomainModule) {
        if (parentModule) {
            throw new Error('DomainModule is already loaded. Import it in the AppModule only');
        }
    }
}
