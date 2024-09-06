import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-price-override-dialog',
  template: `
    <h2 mat-dialog-title>Override Price</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <mat-form-field>
          <input matInput type="number" placeholder="New Price" formControlName="overridePrice">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button [disabled]="!form.valid" (click)="onSubmit()">Apply</button>
    </mat-dialog-actions>
  `
})
export class PriceOverrideDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PriceOverrideDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {currentPrice: number}
  ) {
    this.form = this.fb.group({
      overridePrice: [data.currentPrice, [Validators.required, Validators.min(0)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value.overridePrice);
    }
  }
}