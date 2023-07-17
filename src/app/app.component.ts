import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { ApiProductService } from './Service/api-product.service';
import { Product } from './Interface/data-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 public menuType:string="default";
 public sellerName:string="";
 public searchIcon = faMagnifyingGlass;
 public suggestedProducts:undefined | Product[];
 public userName:string='';
 public cartItems:number=0;


  constructor(private router:Router,private apiProductService:ApiProductService){}

  ngOnInit(): void {
    this.router.events.subscribe((data:any)=>{
      if(data.url){
        if(localStorage.getItem('seller') && data.url.includes('Seller')){
          this.menuType="seller"
      }
      
      else if(localStorage.getItem('user')){
        let userStore = localStorage.getItem('user');
        let userData = userStore && JSON.parse(userStore);
        this.userName= userData.firstName;
        this.menuType='user';
        this.apiProductService.getCartProducts(userData.id)
      }
      else{
        this.menuType="default"
      }
    } 
    })

    this.getCartData();
 
  }

  logOut(){
    localStorage.removeItem('seller');
    this.router.navigate([''])
  }

  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['user-auth']);
    this.apiProductService.CartProducts.emit([])
  }

  searchProduct(query:KeyboardEvent){
    let element = query.target as HTMLInputElement;
    this.apiProductService.searchProducts(element.value).subscribe(data=>{
      this.suggestedProducts=data;
    })
  }

  hideSuggestion(){
    this.suggestedProducts = undefined;
  }

  searchItem(query:string){
    this.router.navigate([`search/${query}`])
  }

  openDetail(id:number){
    this.router.navigate([`/detail/${id}`]);
  }

  getCartData(){
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cartItems=JSON.parse(cartData).length;
    }
 
      this.apiProductService.CartProducts.subscribe(items=>{
        this.cartItems=items.length;
      })
   
  }

}
