// src/app/components/cart/cart.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any = null;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.apiService.getCart().subscribe(
      (data: any) => {
        this.cart = data;
      },
      (error: any) => {
        console.error('Error fetching cart', error);
        this.snackBar.open('Error loading cart', 'Close', { duration: 3000 });
      }
    );
  }

  removeItem(itemId: number): void {
    this.apiService.removeFromCart(itemId).subscribe(
      () => {
        this.loadCart();
        this.snackBar.open('Item removed from cart', 'Close', { duration: 2000 });
      },
      (error: any) => {
        console.error('Error removing item from cart', error);
        this.snackBar.open('Error removing item from cart', 'Close', { duration: 3000 });
      }
    );
  }
}