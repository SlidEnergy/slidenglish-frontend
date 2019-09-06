import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {Routes, RouterModule} from '@angular/router';
import {WordsPageComponent} from './words/words-page.component';
import {WordListComponent} from './words/word-list.component';
import {WordsService} from "./words.service";
import { ImportPageComponent } from './import/import-page.component';

const routes: Routes = [
    {path: '', component: WordsPageComponent},
    {path: 'import', component: ImportPageComponent},
];

@NgModule({
    declarations: [
        WordsPageComponent,
        WordListComponent,
        ImportPageComponent,
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
