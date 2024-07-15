// src/app/components/add-product/add-product.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  template: `
    <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Name" formControlName="name">
      </mat-form-field>
      <mat-form-field>
        <input matInput type="number" placeholder="Price" formControlName="price">
      </mat-form-field>
      <mat-form-field>
        <textarea matInput placeholder="Description" formControlName="description"></textarea>
      </mat-form-field>
      <mat-form-field>
        <mat-select placeholder="Location" formControlName="location">
          <mat-option *ngFor="let location of locations" [value]="location.id">
            {{location.name}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-select placeholder="Department" formControlName="department">
          <mat-option *ngFor="let department of departments" [value]="department.id">
            {{department.name}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <input matInput type="number" placeholder="On Hand" formControlName="on_hand">
      </mat-form-field>
      <mat-checkbox formControlName="is_available">Is Available</mat-checkbox>
      <button mat-raised-button color="primary" type="submit" [disabled]="!productForm.valid">Add Product</button>
    </form>
  `
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  locations: any[] = [];
  departments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      location: ['', Validators.required],
      department: ['', Validators.required],
      on_hand: [0, [Validators.required, Validators.min(0)]],
      is_available: [true]
    });
  }

  ngOnInit() {
    this.apiService.getLocations().subscribe(locations => this.locations = locations);
    this.apiService.getDepartments().subscribe(departments => this.departments = departments);
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.apiService.addProduct(this.productForm.value).subscribe(
        response => {
          this.snackBar.open('Product added successfully', 'Close', { duration: 3000 });
          this.productForm.reset();
        },
        error => {
          this.snackBar.open('Error adding product', 'Close', { duration: 3000 });
        }
      );
    }
  }
}