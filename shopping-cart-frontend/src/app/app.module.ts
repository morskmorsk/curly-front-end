// // src/app/app.module.ts

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { AuthComponent } from './components/auth/auth.component';
// import { ProductListComponent } from './components/product-list/product-list.component';
// import { CartComponent } from './components/cart/cart.component';
// import { CheckoutComponent } from './components/checkout/checkout.component';
// import { AuthInterceptor } from './interceptors/auth.interceptor';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { AddLocationComponent } from './components/add-location/add-location.component';
// import { AddDepartmentComponent } from './components/add-department/add-department.component';
// import { AddProductComponent } from './components/add-product/add-product.component';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatSelectModule } from '@angular/material/select';

// @NgModule({
//   declarations: [
//     AppComponent,
//     AuthComponent,
//     ProductListComponent,
//     CartComponent,
//     CheckoutComponent,
//     AddLocationComponent,
//     AddDepartmentComponent,
//     AddProductComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     FormsModule,
//     HttpClientModule,
//     BrowserAnimationsModule,
//     MatToolbarModule,
//     MatButtonModule,
//     MatSidenavModule,
//     MatIconModule,
//     MatListModule,
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatGridListModule,
//     MatSnackBarModule,
//     MatDividerModule,
//     MatProgressSpinnerModule,
//     ReactiveFormsModule,
//     MatCheckboxModule,
//     MatSelectModule
//   ],
//   providers: [
//     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
///////////////////////////////////////////////////////////////////
// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Angular Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Add this
import { MatGridListModule } from '@angular/material/grid-list'; // Add this

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { AddProductComponent } from './components/add-product/add-product.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProductListComponent,
    CartComponent,
    CheckoutComponent,
    AddLocationComponent,
    AddDepartmentComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule, // Add this
    MatGridListModule // Add this
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }