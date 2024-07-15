// src/app/components/add-department/add-department.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-department',
  template: `
    <form [formGroup]="departmentForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Name" formControlName="name">
      </mat-form-field>
      <mat-form-field>
        <textarea matInput placeholder="Description" formControlName="description"></textarea>
      </mat-form-field>
      <mat-checkbox formControlName="is_taxable">Is Taxable</mat-checkbox>
      <button mat-raised-button color="primary" type="submit" [disabled]="!departmentForm.valid">Add Department</button>
    </form>
  `
})
export class AddDepartmentComponent {
  departmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      is_taxable: [true]
    });
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      this.apiService.addDepartment(this.departmentForm.value).subscribe(
        response => {
          this.snackBar.open('Department added successfully', 'Close', { duration: 3000 });
          this.departmentForm.reset();
        },
        error => {
          this.snackBar.open('Error adding department', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
