// src/app/components/product-list/product-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PriceOverrideDialogComponent } from '../price-override-dialog/price-override-dialog.component'; // Import the dialog component

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  gridColumns: number = 4;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog, // Add MatDialog to the constructor
  ) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.gridColumns = 1;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.gridColumns = 2;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.gridColumns = 3;
        } else {
          this.gridColumns = 4;
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    this.apiService.getProducts().subscribe(
      (data) => {
        this.products = data.results;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching products', error);
        this.error = 'Error loading products. Please try again later.';
        this.isLoading = false;
        this.snackBar.open('Error loading products', 'Close', { duration: 3000 });
      }
    );
  }

  // addToCart(productId: number): void {
  //   this.apiService.addToCart(productId, 1).subscribe(
  //     (response) => {
  //       console.log('Product added to cart', response);
  //       this.snackBar.open('Product added to cart', 'Close', { duration: 2000 });
  //       this.router.navigate(['/cart']); // Navigate to the cart page
  //     },
  //     (error) => {
  //       console.error('Error adding product to cart', error);
  //       this.snackBar.open('Error adding product to cart', 'Close', { duration: 3000 });
  //     }
  //   );
  // }
  // addToCart(productId: number) {
  //   // Open the price override dialog
  //   const dialogRef = this.dialog.open(PriceOverrideDialogComponent, {
  //     width: '300px',
  //     data: { productId: productId }
  //   });

  //   // After the dialog is closed
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // If the user provided an override price or confirmed the action
  //       this.apiService.addToCart(productId, result.overridePrice).subscribe(() => {
  //         // Navigate to the cart page after the item is added
  //         this.router.navigate(['/cart']);
  //       });
  //     }
  //   });
  // }
  addToCart(productId: number) {
    const dialogRef = this.dialog.open(PriceOverrideDialogComponent, {
      width: '300px',
      data: { productId: productId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Ensure both quantity and overridePrice are handled
        const overridePrice = result.overridePrice ? result.overridePrice : null;
  
        // Add to cart service, sending quantity as 1 by default and passing the override price
        this.apiService.addToCart(productId, 1, overridePrice).subscribe(() => {
          this.router.navigate(['/cart']);
        });
      }
    });
  }
}
