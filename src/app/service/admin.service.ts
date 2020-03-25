import { Injectable } from '@angular/core';
import { RequestBaseService } from './request-base.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private httpService: RequestBaseService,
    private http:HttpClient,
    private router:Router
  ) { }

  login(postData){

    return this.httpService.httpPostLogin('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYKFgr6tkzlt17v8dvdtUFGuJWDszI8hE',{
      email:postData.email,
      password:postData.password,
      returnSecureToken:true
    }).pipe(map(res=>{
      console.log(res);
      if(res.hasOwnProperty('kind')){
        console.log(res['idToken'])
        sessionStorage.setItem('token',res['idToken'].toString());
        console.log('it work')
      }
    }))
  }

  isLoggedIn(){
    if(sessionStorage.getItem('token')){
      return true;
    }
    // this.router.navigate(['/admin/auth/login']);
    return false
  }

  getToken(){
    let token =sessionStorage.getItem('token');
    if(token){
      return token 
    }
    return;
  }

  logout(){
    sessionStorage.removeItem('token'); 
    this.router.navigate(['/','admin']);      
    // this.router.navigate(['/auth']);
  }

}
