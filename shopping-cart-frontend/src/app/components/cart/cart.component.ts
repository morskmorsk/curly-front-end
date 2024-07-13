// src/app/components/cart/cart.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.apiService.getCart().subscribe(
      (data) => {
        this.cartItems = data.items;
      },
      (error) => {
        console.error('Error fetching cart', error);
      }
    );
  }
}