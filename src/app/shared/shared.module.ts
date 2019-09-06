import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatNativeDateModule, MatIconModule, MatButtonModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatSnackBarModule, MatProgressSpinnerModule, MatMenuModule
} from '@angular/material';

import { MatProgressButtonsModule } from 'mat-progress-buttons'
import {DxButtonModule, DxDataGridModule, DxTagBoxModule, DxTextAreaModule} from 'devextreme-angular';
import { LogPipe } from './pipes/log.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatCardModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        FlexLayoutModule,

        MatNativeDateModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatProgressButtonsModule,
        MatMenuModule,

        DxDataGridModule,
        DxTagBoxModule,
        DxTextAreaModule,
        DxButtonModule,

        LogPipe
    ],
    declarations: [LogPipe]
})
export class SharedModule { }
