import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {Routes, RouterModule} from '@angular/router';
import {WordsPageComponent} from './words/words-page.component';
import {WordListComponent} from './words/word-list.component';
import {WordsService} from "./words.service";

const routes: Routes = [
    {path: '', component: WordsPageComponent},
];

@NgModule({
    declarations: [
        WordsPageComponent,
        WordListComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        WordsService
    ],
    entryComponents: []
})
export class WordsModule {
}
