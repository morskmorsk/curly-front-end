import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface CartItem {
  productName: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  displayedColumns: string[] = ['productName', 'quantity', 'price', 'subtotal', 'tax', 'total'];
  cartTotal = 0;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCart();
  }

  // loadCart(): void {
  //   this.apiService.getCart().subscribe(
  //     (data: any) => {
  //       this.cartItems = data.items;
  //       this.calculateCartTotal();
  //     },
  //     (error: any) => {
  //       console.error('Error fetching cart', error);
  //       this.snackBar.open('Error loading cart', 'Close', { duration: 3000 });
  //     }
  //   );
  // }
  loadCart(): void {
    this.apiService.getCart().subscribe(
      (data: any) => {
        console.log(data); // Log the API response
        this.cartItems = data.items;
        this.calculateCartTotal();
      },
      (error: any) => {
        console.error('Error fetching cart', error);
        this.snackBar.open('Error loading cart', 'Close', { duration: 3000 });
      }
    );
  }

  calculateTotal(item: any): number {
    const subtotal = parseFloat(item.subtotal) || 0; // Ensure it's a number
    const tax = parseFloat(item.tax) || 0; // Ensure it's a number
    return subtotal + tax;
  }

  calculateCartTotal(): void {
    this.cartTotal = this.cartItems.reduce((total, item) => {
      return total + this.calculateTotal(item);
    }
    , 0);
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

  checkout(): void {
    this.apiService.checkout().subscribe(
      (response) => {
        console.log('Checkout successful', response);
        this.snackBar.open('Checkout successful', 'Close', { duration: 2000 });
        this.loadCart(); // Optionally refresh the cart after checkout
      },
      (error) => {
        console.error('Error during checkout', error);
        this.snackBar.open('Error during checkout', 'Close', { duration: 3000 });
      }
    );
  }
}
