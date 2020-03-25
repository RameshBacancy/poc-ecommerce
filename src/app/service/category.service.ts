import { Injectable } from '@angular/core';
import { RequestBaseService } from './request-base.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private path = 'category.json';
  constructor(
    private httpService: RequestBaseService
  ) { }

  addCategory(category) {
    return this.httpService.httpPostCategory(this.path, { name: category }).pipe(map(res=>{
      console.log('---category service---',res);
      return res;
    }))
  }

  getCategory() {
    return this.httpService.httpGetCategory(this.path).pipe(map((res:any)=>{
      console.log('---category service---',res);
      let categories = [];
      for(const key in res) {
        categories.push({ key:key ,name: res[key]['name'] });          
      }
      return categories;
    }))
  }

  deleteCategory(categoryKey){
    return this.httpService.httpDeleteCategory('category/' + categoryKey+'.json').pipe(map(res=>res));
  }

}
