import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { SellerComponent } from './Pages/seller/seller.component';
import { HomeSellerComponent } from './Pages/home-seller/home-seller.component';
import { SellerGuard } from './Guard/seller.guard';
import { SellerAddProductComponent } from './Pages/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './Pages/seller-update-product/seller-update-product.component';
import { SearchComponent } from './Pages/search/search.component';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';
import { UserAuthComponent } from './Pages/user-auth/user-auth.component';
import { MyCartComponent } from './Pages/my-cart/my-cart.component';
import { CheckoutComponent } from './Pages/checkout/checkout.component';
import { MyOrderComponent } from './Pages/my-order/my-order.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"seller", component:SellerComponent},
  {path:'homeSeller', component:HomeSellerComponent,canActivate:[SellerGuard]},
  {path:'SellerAddProduct', component:SellerAddProductComponent,canActivate:[SellerGuard]},
  {path:'SellerUpdateProduct/:id', component:SellerUpdateProductComponent, canActivate:[SellerGuard]},
  {path:'search/:query', component:SearchComponent},
  {path:'detail/:id', component:ProductDetailComponent},
  {path:'user-auth', component:UserAuthComponent},
  {path:'myCart', component:MyCartComponent},
  {path:'checkout', component:CheckoutComponent},
  {path:'myOrder', component:MyOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
