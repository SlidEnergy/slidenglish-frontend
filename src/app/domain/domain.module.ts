import { Optional, SkipSelf, NgModule } from '@angular/core';
import { WordDataSet} from "./words/word-dataset";
import {DataContext} from "./data-context";
import {EntityRepository} from "./interfaces/entity-repository";
import {WordsService} from "../api";

@NgModule({
    providers: [
        WordDataSet,
        DataContext,
        [{ provide: EntityRepository, useClass: WordsService }]
    ]
})
export class DomainModule {
    constructor(@Optional() @SkipSelf() parentModule: DomainModule) {
        if (parentModule) {
            throw new Error('DomainModule is already loaded. Import it in the AppModule only');
        }
    }
}
