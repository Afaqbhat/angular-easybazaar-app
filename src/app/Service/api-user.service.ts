import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, SignUp } from '../Interface/data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
public isUserInvalid=new BehaviorSubject<boolean>(false)
  constructor(private http:HttpClient, private router:Router) { }

SignupUser(user:SignUp){
  this.http.post("http://localhost:3000/user",user,{observe:'response'}).
  subscribe(data=>{
      localStorage.setItem('user',JSON.stringify(data.body));
      this.router.navigate([''])
    
    
  })
}

loginUser(user:Login){
  this.http.get<SignUp[]>(`http://localhost:3000/user?email=${user.email}&password=${user.password}`,
  {observe:'response'}).subscribe(data=>{
    
     if(data && data.body?.length){
      this.isUserInvalid.next(false)
      localStorage.setItem('user',JSON.stringify(data.body[0]));
      this.router.navigate([''])
     }else{
          this.isUserInvalid.next(true)
     }
      
  })
}

userAuthReload(){
  if(localStorage.getItem('user')){
    this.router.navigate(['']);
  }
}


}
