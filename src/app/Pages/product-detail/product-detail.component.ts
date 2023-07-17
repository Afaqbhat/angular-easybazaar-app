import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from 'src/app/Interface/data-type';
import { ApiProductService } from 'src/app/Service/api-product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
 public productDetail: undefined | Product;
 public productQuantity:number=1;
 public removeCart:boolean=false;
 public cartData: undefined | Product
  constructor(private route:ActivatedRoute, private apiProductService:ApiProductService){}

ngOnInit(): void {
  let id=this.route.snapshot.paramMap.get('id');
  id && this.apiProductService.getProductById(id).subscribe(data=>{
    this.productDetail=data;
  })
  
  //remove cart option
  let cartData= localStorage.getItem('localCart');
  if(id && cartData){
    let items = JSON.parse(cartData);
    items = items.filter((item:Product)=>id === item.id.toString());
    if(items.length){
      this.removeCart=true
    }else{
      this.removeCart=false
    }
}

let user = localStorage.getItem('user');
if(user){
  let userId= user && JSON.parse(user).id;
  this.apiProductService.getCartProducts(userId);

  this.apiProductService.CartProducts.subscribe((data)=>{
    let item = data.filter((item:Product)=>id?.toString()===item.productId?.toString())
 if(item.length){
  this.cartData=item[0];
  this.removeCart=true;
 }
  })
}
}

handleQuantity(value:string){
   if(this.productQuantity < 20 && value === 'plus'){
    this.productQuantity += 1;
   }
   else if(this.productQuantity > 1 && value === 'minus'){
    this.productQuantity -= 1;
   }
}

onAddCart(){
  if(this.productDetail){
    this.productDetail.quantity=this.productQuantity;
    if(!localStorage.getItem('user'))
    {
    this.apiProductService.localAddToCart(this.productDetail);
    this.removeCart=true
    }else
    {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      let cartData:Cart={
        ...this.productDetail,
        userId,
        productId:this.productDetail.id
      }
      delete cartData.id
      this.apiProductService.addToCart(cartData).subscribe(data=>{
        if(data){
          this.apiProductService.getCartProducts(userId);
          this.removeCart=true;
        }
      })
    }
    
  }
}

onRemoveCart(productId:number){
  if(!localStorage.getItem('user')){
  this.apiProductService.removeItemFromCart(productId);
    }else{
      this.cartData && this.apiProductService.removeFromCart(this.cartData.id)
      .subscribe((data)=>{
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        this.apiProductService.getCartProducts(userId)
      })
    }
    this.removeCart=false
  }

}


