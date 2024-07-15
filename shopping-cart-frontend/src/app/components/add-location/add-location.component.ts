// src/app/components/add-location/add-location.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-location',
  template: `
    <form [formGroup]="locationForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Name" formControlName="name">
      </mat-form-field>
      <mat-form-field>
        <textarea matInput placeholder="Description" formControlName="description"></textarea>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="!locationForm.valid">Add Location</button>
    </form>
  `
})
export class AddLocationComponent {
  locationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.locationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.locationForm.valid) {
      this.apiService.addLocation(this.locationForm.value).subscribe(
        response => {
          this.snackBar.open('Location added successfully', 'Close', { duration: 3000 });
          this.locationForm.reset();
        },
        error => {
          this.snackBar.open('Error adding location', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
