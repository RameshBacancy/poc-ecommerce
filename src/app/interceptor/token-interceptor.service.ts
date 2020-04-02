

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private adminService: UserService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('interceptor call');
    const token = this.adminService.authToken;
    let newHeaders = new HttpHeaders;
    if (token) {
      newHeaders = newHeaders.append('authToken', token);
    }
    const authReq = req.clone({ headers: newHeaders })
    return next.handle(authReq);
  }
}
