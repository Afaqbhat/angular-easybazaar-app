import { Component,OnInit } from '@angular/core';
import { Cart, Login, Product, SignUp } from 'src/app/Interface/data-type';
import { ApiProductService } from 'src/app/Service/api-product.service';
import { ApiUserService } from 'src/app/Service/api-user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{
public showLogin:boolean=true;
public loginFailed:string=''
constructor(private apiUserService:ApiUserService, private apiProductService:ApiProductService){}

ngOnInit(): void {
  this.apiUserService.userAuthReload()
}

  onSignup(user:SignUp){
    this.apiUserService.SignupUser(user)
    
  }

  onLogin(user:Login){
    this.apiUserService.loginUser(user);
    this.apiUserService.isUserInvalid.subscribe(data=>{
       if(data){
        this.loginFailed="Please Enter Valid Credentials"
       }else
       {
        setTimeout(() => {
          this.localCartToDatabase();
        }, 300);
       }
    })
    
  }

  openSignup(){
    this.showLogin=false
  }

  openLogin(){
    this.showLogin=true
  }

  localCartToDatabase(){
       let products = localStorage.getItem('localCart');
       let user=localStorage.getItem('user');
       let userId= user && JSON.parse(user).id;
       
       if(products){
        let cartProductList:Product[] = JSON.parse(products)  
       cartProductList.forEach((product:Product,index)=>{
        let cartProduct:Cart = {
          ...product,
          userId,
          productId:product.id
        };
        delete cartProduct.id;
        setTimeout(() => {
          this.apiProductService.addToCart(cartProduct).subscribe(data=>{
               
          })
          localStorage.removeItem('localCart')
        }, 500);
        if(cartProductList.length===index+1){
          localStorage.removeItem('localCart')
        }
       })
       }

       setTimeout(()=>{
        this.apiProductService.getCartProducts(userId);
        
       },2000)
  }
}


