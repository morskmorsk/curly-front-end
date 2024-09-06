import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-price-override-dialog',
  templateUrl: './price-override-dialog.component.html',
  styleUrls: ['./price-override-dialog.component.css']
})
export class PriceOverrideDialogComponent {
  overridePrice: number | null = null; // Variable to store the override price

  constructor(
    public dialogRef: MatDialogRef<PriceOverrideDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number }
  ) {}

  onConfirm(): void {
    // Send the entered override price back to the calling component
    this.dialogRef.close({ overridePrice: this.overridePrice });
  }

  onCancel(): void {
    // If the user cancels, close without returning any data
    this.dialogRef.close();
  }
}