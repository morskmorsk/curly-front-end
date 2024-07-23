// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuard } from './guards/auth.guard';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminGuard } from './guards/admin.guard'; // You'll need to create this


const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'add-location', component: AddLocationComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'add-department', component: AddDepartmentComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard, AdminGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }