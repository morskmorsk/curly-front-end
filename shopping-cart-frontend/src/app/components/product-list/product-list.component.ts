// src/app/components/product-list/product-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private apiService: ApiService) { }

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
      }
    );
  }

  addToCart(productId: number): void {
    this.apiService.addToCart(productId, 1).subscribe(
      (response) => {
        console.log('Product added to cart', response);
      },
      (error) => {
        console.error('Error adding product to cart', error);
      }
    );
  }
}