import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-delete-hero-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './delete-hero-dialog.component.html',
  styleUrls: ['./delete-hero-dialog.component.css']
})
export class DeleteHeroDialogComponent {

  data = inject(MAT_DIALOG_DATA)

  dialogRef = inject(MatDialogRef<DeleteHeroDialogComponent>)

  cancelClick() {
    this.dialogRef.close({ remove: false })
  }

  confirmClick() {
    // Logic here remove hero

    this.dialogRef.close({ remove: true, hero: { ...this.data } })
  }

}
