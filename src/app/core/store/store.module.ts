import {NgModule, Optional, SkipSelf} from '@angular/core';
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreModule as NgrxStoreModule} from "@ngrx/store";
import {coreReducer} from "./core.store";
import {EffectsModule} from "@ngrx/effects";
import {CoreEffects} from "./core.effects";
import {EntityDataModule, EntityDataService} from "@ngrx/data";
import {entityConfig} from "./entity-metadata";
import {environment} from "../../../environments/environment";
import {WordsDataService} from "./words-data-service";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    declarations: [],
    imports: [
        StoreRouterConnectingModule.forRoot(),
        NgrxStoreModule.forRoot({core: coreReducer}),
        EffectsModule.forRoot([CoreEffects]),
        EntityDataModule.forRoot(entityConfig),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
    ],
    providers: [
        WordsDataService,
    ]
})
export class StoreModule {
    constructor(
        @Optional() @SkipSelf() parentModule: StoreModule,
        entityDataService: EntityDataService,
        wordsDataService: WordsDataService
    ) {
        entityDataService.registerService('Word', wordsDataService);
    }
}
