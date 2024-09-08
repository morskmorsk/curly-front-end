import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';  // Import your API service

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentMethod: string = 'creditCard';  // Default to credit card
  cashPayment = {
    tendered: 0
  };
  totalAmount: number = 0;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getCartTotal().subscribe(
      (response: { total: number }) => {  // Explicitly declare the response type
        if (response && typeof response.total === 'number') {
          this.totalAmount = response.total;  // Set the totalAmount to the number
        } else {
          this.totalAmount = 0;  // Fallback to 0 if there's an issue
        }
      },
      (error) => {
        console.error('Error fetching cart total', error);
        this.totalAmount = 0;  // Fallback in case of error
      }
    );
  }

  calculateChange(): number {
    return this.cashPayment.tendered - this.totalAmount;
  }

  // Handle the payment submission
  onSubmit(): void {
    if (this.paymentMethod === 'creditCard') {
      this.apiService.markAsCreditCardPayment().subscribe(() => {
        this.router.navigate(['/success'], { state: { method: 'creditCard' } });
      });
    } else if (this.paymentMethod === 'cash') {
      if (this.cashPayment.tendered >= this.totalAmount) {
        const change = this.calculateChange();
        this.apiService.processCashPayment(this.cashPayment.tendered).subscribe(() => {
          this.router.navigate(['/success'], { state: { method: 'cash', changeDue: change } });
        });
      } else {
        alert('The tendered amount is less than the total amount.');
      }
    }
  }
}