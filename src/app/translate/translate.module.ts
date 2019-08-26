import { NgModule } from '@angular/core';
import { TranslatePageComponent } from './translate-page/translate-page.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {path: '', component: TranslatePageComponent},
];

@NgModule({
  declarations: [TranslatePageComponent],
  imports: [
      SharedModule,
      RouterModule.forChild(routes),
  ]
})
export class TranslateModule { }
