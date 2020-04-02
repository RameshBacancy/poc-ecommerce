import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { EndPoint } from '../app.constants';
import { RequestServiceBase } from './request-service-base';
import { NumberList, INumberList, ICapabilities } from '../models/number-list.model';
@Injectable({
    providedIn: 'root'
})
export class NumberListService {
    
    authToken: string = null;
    user: any;
    constructor(
        private http: HttpClient,
        private httpService: RequestServiceBase) { 
        
    }
    getNumbersByType(type:string): Observable<INumberList>{
        const searchTypeUrl = '../../assets/JSON/number-type-response.json';
        // const searchTypeUrl = `${EndPoint.numberSearchType}${type}`;
        return this.httpService.httpGet<INumberList[]>(searchTypeUrl).pipe(map(res=>{
            return res;
        }));
        
    }

    postPurchaseNumber(purchaseNumData:any): Observable<any>{
        // const gerNumberURL = '../assets/JSON/number-type-response.json';
        const searchTypeUrl = `${EndPoint.numberPurchase}`;
        
        return this.httpService.httpPost(searchTypeUrl, purchaseNumData);
    }

  
}