import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, priceSummary } from 'src/app/Interface/data-type';
import { ApiProductService } from 'src/app/Service/api-product.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent {
  cartProducts: Cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private apiProductService: ApiProductService, private router: Router) { }

  ngOnInit(): void {
   this.loadProducts()

  }

  loadProducts(){
    this.apiProductService.getCurrentCartProducts().subscribe((data) => {
      this.cartProducts = data;
      let price = 0;
      data.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);
      if(!this.cartProducts.length){
        this.router.navigate([''])
      }

})
  }

  removeFromCart(productId?:number){
     productId && this.cartProducts && this.apiProductService.removeFromCart(productId)
       .subscribe(()=>{
         this.loadProducts();
       })
  }

  onCheckout(){
    this.router.navigate(['checkout'])
  }
}
