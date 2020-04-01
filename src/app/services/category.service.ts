import { Injectable } from '@angular/core';
import { RequestServiceBase } from './request-service-base';
import { EndPoint } from '../app.constants';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(
    private httpService: RequestServiceBase
  ) { }
  
  // for load all category form firebase database
  getCategory(): Observable<Category[]> {
    return this.httpService.httpGet(EndPoint.category).pipe(map((res: any) => {
      // console.log('---category service---', res);
      let categories = [];
      for (const key in res) {
        categories.push({ value: key, name: res[key]['name']  });
      }
      return categories;
    }));
  }

  // add category in database 
  addCategory(categoryName): Observable<any> {
    return this.httpService.httpPost(EndPoint.category, { name: categoryName }).pipe(map(res => res));
  }

  // edit category in database
  editCategory(category: Category): Observable<any> {
    let path = EndPoint.hCategory + category.value + '.json';
    return this.httpService.httpPut(path, { name: category.name }).pipe(map(res => {
      // console.log('---category service---', res);
      return res;
    }));
  }

  // delete category from database
  deleteCategory(categoryKey): Observable<any> {
    return this.httpService.httpDelete('/category/' + categoryKey + '.json').pipe(map(res => res));
  }
}
