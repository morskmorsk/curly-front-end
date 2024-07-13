// src/app/components/checkout/checkout.component.ts

import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private apiService: ApiService, private router: Router) { }

  checkout(): void {
    this.apiService.checkout().subscribe(
      (response) => {
        console.log('Checkout successful', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error during checkout', error);
      }
    );
  }
}