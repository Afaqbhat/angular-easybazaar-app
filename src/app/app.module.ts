import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Pages/home/home.component';
import { SellerComponent } from './Pages/seller/seller.component';
import { HomeSellerComponent } from './Pages/home-seller/home-seller.component';
import { SellerAddProductComponent } from './Pages/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './Pages/seller-update-product/seller-update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './Pages/search/search.component';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';
import { UserAuthComponent } from './Pages/user-auth/user-auth.component';
import { MyCartComponent } from './Pages/my-cart/my-cart.component';
import { CheckoutComponent } from './Pages/checkout/checkout.component';
import { MyOrderComponent } from './Pages/my-order/my-order.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SellerComponent,
    HomeSellerComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    SearchComponent,
    ProductDetailComponent,
    UserAuthComponent,
    MyCartComponent,
    CheckoutComponent,
    MyOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,

    FontAwesomeModule,
     NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
