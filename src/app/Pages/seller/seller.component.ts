import { Component,OnInit } from '@angular/core';
import { ApiSellerService } from 'src/app/Service/api-seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from 'src/app/Interface/data-type';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit{
showLogin:boolean=false
loginFailed=''
  constructor(private apiSellerService:ApiSellerService,private router:Router){}

  ngOnInit(): void {
    this.apiSellerService.reloadSeller();
  }

  onSignup(data:SignUp) {
    
    this.apiSellerService.signupUser(data);
}

onLogin(data:Login){
  this.apiSellerService.loginUser(data);
    this.apiSellerService.isSellerLoggedIn.subscribe((error)=>{
      if(error){
         this.loginFailed="Email or password is not correct";
      }
    })
      
}

openLogin(){
   this.showLogin=true;
}

openSignup(){
  this.showLogin=false
}

}
