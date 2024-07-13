// src/app/components/checkout/checkout.component.ts

import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(
    private apiService: ApiService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  checkout(): void {
    this.apiService.checkout().subscribe(
      (response: any) => {
        console.log('Checkout successful', response);
        this.snackBar.open('Checkout successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Error during checkout', error);
        this.snackBar.open('Error during checkout. Please try again.', 'Close', { duration: 3000 });
      }
    );
  }
}