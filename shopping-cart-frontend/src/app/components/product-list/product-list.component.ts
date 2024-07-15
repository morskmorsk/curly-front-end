// src/app/components/product-list/product-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  gridColumns$: Observable<number>;
  isLoading = true;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar
  ) {
    this.gridColumns$ = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).pipe(
      map(result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          return 1;
        } else if (result.breakpoints[Breakpoints.Small]) {
          return 2;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          return 3;
        } else {
          return 4;
        }
      })
    );
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    this.apiService.getProducts().subscribe(
      data => {
        this.products = data.results;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching products', error);
        this.error = 'Error loading products. Please try again later.';
        this.isLoading = false;
        this.snackBar.open('Error loading products', 'Close', { duration: 3000 });
      }
    );
  }

  addToCart(productId: number): void {
    this.apiService.addToCart(productId, 1).subscribe(
      response => {
        console.log('Product added to cart', response);
        this.snackBar.open('Product added to cart', 'Close', { duration: 2000 });
      },
      error => {
        console.error('Error adding product to cart', error);
        this.snackBar.open('Error adding product to cart', 'Close', { duration: 3000 });
      }
    );
  }
}
