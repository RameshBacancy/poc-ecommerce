import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from '../service/admin.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private adminService: AdminService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('interceptor call');
        const token = this.adminService.getToken();
        let newHeaders =  new HttpHeaders;
        if (token) {
            newHeaders = newHeaders.append('authToken',token);
        }
        const authReq = req.clone({headers: newHeaders})
        return next.handle(authReq);
    }
}