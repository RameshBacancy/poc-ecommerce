import { Injectable } from '@angular/core';
import { RequestBaseService } from './request-base.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private path = 'product.json';

  constructor(
    private httpService: RequestBaseService

  ) { }
  addProduct(productBody) {
    return this.httpService.httpPostProduct(this.path, productBody).pipe(map(res=>{
      console.log('---product service---',res);
      return res;
    }))
  }

  editProduct(productId,productBody) {
    return this.httpService.httpPutProduct('product/'+productId+'.json', productBody).pipe(map(res=>{
      console.log('---product service---',res);
      return res;
    }))
  }

  deleteProduct(productId){
    return this.httpService.httpDeleteProduct('product/'+productId+'.json').pipe(map(res=>res));
  }

  getAllProduct(){
    return this.httpService.httpGetProduct(this.path).pipe(map((res:any)=>{
      let product = [];
      for(const key in res) {
        product.push({ key:key ,...res[key] });          
      }
      return product;
    }))
  }

  getSingleProduct(pid){
    return this.httpService.httpGetSingleProduct('product/'+pid+'.json').pipe(map(res=>res))
  }
}
