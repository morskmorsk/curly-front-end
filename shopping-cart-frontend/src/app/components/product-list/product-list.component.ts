// src/app/components/product-list/product-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  cols: number = 3;

  constructor(
    private apiService: ApiService,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar
  ) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.cols = 1;
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.cols = 2;
      } else {
        this.cols = 3;
      }
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe(
      (data) => {
        this.products = data.results;
      },
      (error) => {
        console.error('Error fetching products', error);
        this.snackBar.open('Error loading products', 'Close', { duration: 3000 });
      }
    );
  }

  addToCart(productId: number): void {
    this.apiService.addToCart(productId, 1).subscribe(
      (response) => {
        console.log('Product added to cart', response);
        this.snackBar.open('Product added to cart', 'Close', { duration: 2000 });
      },
      (error) => {
        console.error('Error adding product to cart', error);
        this.snackBar.open('Error adding product to cart', 'Close', { duration: 3000 });
      }
    );
  }
}