import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, order } from 'src/app/Interface/data-type';
import { ApiProductService } from 'src/app/Service/api-product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
   public cartProducts?:Cart[];
   public totalPrice?:number;
  
  constructor(private apiProductService:ApiProductService,private router:Router){}

  ngOnInit(): void {
    this.apiProductService.getCurrentCartProducts().subscribe((data) => {

      let price = 0;
      this.cartProducts = data;
      data.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.totalPrice = price + (price / 10) + 100 - (price / 10);
    })
  }

  orderNow(data:order){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
      }
       
      this.cartProducts?.forEach(item=>{
        setTimeout(() => {
          
          this.apiProductService.deleteCartItems(item.id)
        }, 700);
      })

      this.apiProductService.addOrderedProducts(orderData).subscribe((data) => {
        if (data) {
          alert('Your Order has been Placed')
          this.router.navigate(['myOrder']);
  }
})

}
  }
}
