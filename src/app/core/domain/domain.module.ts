import {NgModule, Optional, SkipSelf} from '@angular/core';
import {WordDataSet} from "./words/word-dataset";
import {DataContext} from "./data-context";
import {EntityRepository} from "./interfaces/entity-repository";
import {WordsNgrxRepository} from "../repositories/words-ngrx.repository";

@NgModule({
    providers: [
        WordDataSet,
        DataContext,
        [{ provide: EntityRepository, useClass: WordsNgrxRepository }]
    ]
})
export class DomainModule {
    constructor(@Optional() @SkipSelf() parentModule: DomainModule) {
        if (parentModule) {
            throw new Error('DomainModule is already loaded. Import it in the AppModule only');
        }
    }
}
