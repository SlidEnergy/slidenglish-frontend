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
import {DxDataGridModule, DxTagBoxModule, DxTextAreaModule} from 'devextreme-angular';

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
        DxTextAreaModule
    ]
})
export class SharedModule { }
