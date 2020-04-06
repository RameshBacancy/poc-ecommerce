import { Injectable } from '@angular/core';
import { RequestServiceBase } from './request-service-base';
import { EndPoint } from '../app.constants';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpService: RequestServiceBase,
    private storage: AngularFireStorage
  ) { }

  downloadURL: Observable<string>;
  fb;
  imageCreatedDate: number = 0;
  singleProduct: Product = {
    productCategory: '',
    productDeliveryType: '',
    productDetail: '',
    productImageUrl: '',
    productImage: '',
    productLink: '',
    productPrice: 0,
    productSiteLink: '',
    productSiteName: '',
    productTitle: '',
    productAffiliateLink: '',
    key: ''
  };
  AdminModule
  // load all product
  getAllProduct(): Observable<Product[]> {
    return this.httpService.httpGet(EndPoint.product).pipe(map((res: any) => {
      const product = [];
      for (const key in res) {
        product.push({ key: key, ...res[key] });
      }
      return product;
    }));
  }

  // getSingleProduct(productId) {
  //   const path = EndPoint.hProduct + productId + '.json';
  //   return this.httpService.httpGet(path);
  // }

  // when product edit click it set that product in this.singleProduct
  setSingleProduct(product: Product) {
    this.singleProduct = product;
  }

  // when product edit successfully then after it remove product form this.singleProduct
  removeSingleProduct() {
    this.singleProduct = {
      productCategory: '',
      productDeliveryType: '',
      productDetail: '',
      productImageUrl: '',
      productImage: '',
      productLink: '',
      productPrice: 0,
      productSiteLink: '',
      productSiteName: '',
      productTitle: '',
      productAffiliateLink: '',
      key: ''
    };
  }

  // image upload in storage
  imageUpload(photoFile) {
    // var n = Date.now();
    // const fileRef = this.storage.ref(`ProductImages/${this.productService.imageCreatedDate}`);
    // const file = photoFile;
    this.getDate();
    const filePath = `ProductImages/${this.imageCreatedDate}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, photoFile);
    return task.snapshotChanges();
  }

  //for set date for image upload
  getDate(): void {
    this.imageCreatedDate = Date.now();
  }

  // remove imageCreatedDate
  removeDate(): void {
    this.imageCreatedDate = 0;
  }

  // for delete image in storage
  deleteImage(imageUrl: string) {
    return this.storage.storage.refFromURL(imageUrl).delete();
  }

  // add product
  addProduct(productBody: Product): Observable<any> {
    return this.httpService.httpPost(EndPoint.product, productBody);
  }

  // edit product
  editProduct(productId: string, productBody: Product): Observable<any> {
    let path = EndPoint.hProduct + productId + '.json';
    return this.httpService.httpPut(path, productBody);
  }

  // delete product
  deleteProduct(productId: string): Observable<any> {
    const path = EndPoint.hProduct + productId + '.json';
    return this.httpService.httpDelete(path);
  }

}
