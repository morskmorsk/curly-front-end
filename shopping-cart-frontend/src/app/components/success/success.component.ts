import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  paymentMethod: string = '';
  changeDue: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { method: string, changeDue?: number };

    if (state) {
      this.paymentMethod = state.method;
      if (this.paymentMethod === 'cash') {
        this.changeDue = state.changeDue || 0;
      }
    }
  }
}