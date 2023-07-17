import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../Interface/data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiSellerService {
  isSellerLoggedIn= new BehaviorSubject<boolean>(false)
  constructor(private http:HttpClient,private router:Router) { 
  }

  signupUser(data:SignUp){
    
     this.http.post("http://localhost:3000/seller",data,{observe:'response'}).subscribe(result=>{
      
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['homeSeller'])

     })
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(["homeSeller"])
    }
  }

  loginUser(data:Login){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:"response"}).subscribe((result:any)=>{
      if(result.body.email ===data.email && result.body.password === data.password){
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['homeSeller']); 
      }
      else{
        this.isSellerLoggedIn.next(true)
      }
      
    })
  }
}
