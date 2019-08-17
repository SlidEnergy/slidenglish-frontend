import { Optional, SkipSelf, NgModule } from '@angular/core';
import {DataSet} from "./words/dataset";
import {DataContext} from "./data-context";

@NgModule({
    providers: [
        DataSet,
        DataContext
    ]
})
export class DomainModule {
    constructor(@Optional() @SkipSelf() parentModule: DomainModule) {
        if (parentModule) {
            throw new Error('DomainModule is already loaded. Import it in the AppModule only');
        }
    }
}
