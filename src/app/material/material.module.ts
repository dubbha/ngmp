import { NgModule } from '@angular/core';
import {
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatToolbarModule,
  MatCardModule,
  MatBadgeModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatDatepickerModule,
  MatChipsModule,
  MatAutocompleteModule,
} from '@angular/material';

import { MomentDateModule } from '@angular/material-moment-adapter';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { DialogService } from './dialog/dialog.service';

@NgModule({
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatBadgeModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MomentDateModule,
    MatChipsModule,
    MatAutocompleteModule,
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatBadgeModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MomentDateModule,
    MatChipsModule,
    MatAutocompleteModule,
    ConfirmDialogComponent,
  ],
  declarations: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  providers: [DialogService],
})
export class MaterialModule { }
