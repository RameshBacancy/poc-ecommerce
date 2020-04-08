import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productId: string;
  productImageUrl: string;
  isModalOpen: boolean;
  products: Product[] = [];
  isProductListShow: boolean;
  constructor(
    private router: Router,
    private productService: ProductService,
    private spinnerService: SpinnerService,
    private alertService: AlertService
  ) {
  this.productId = '';
  this.productImageUrl = '';
  this.isModalOpen = false;
  this.isProductListShow = false;
  }

  ngOnInit() {
    this.isModalOpen = false;
    this.isProductListShow = false;
    this.spinnerService.openSpinner();
    this.loadProduct();
  }


  /** Start: load all product and store in this.product */
  loadProduct() {
    this.productService.getAllProduct()
      .subscribe(
        (res: Product[]) => {
          this.products = res;
          this.isProductListShow = true;
          this.spinnerService.closeSpinner();
        },
        err => this.errorHandel(err));
  }
  /** End: loadProduct */

  /** Start : for Add product button click to change navigation */
  onAddProductClick() {
    this.router.navigate(['', 'admin', 'dashboard', 'products', 'add']);
  }
  /** End: onAddProductClick */

  /** Start : for edit product button click to change navigation */
  onEditProductClick(product: Product) {
    this.productService.setSingleProduct(product);
    this.router.navigate(['', 'admin', 'dashboard', 'products', 'edit', product.key]);
  }
  /** End: onEditProductClick */


  /** Start: on product delete button click */
  onDeleteProductClick(productId, productImageUrl) {
    this.isModalOpen = true;
    this.productId = productId;
    this.productImageUrl = productImageUrl;
  }

  /** start:   first delete image  form storage and then after delete product */
  onModalResult(result: boolean) {
    this.isModalOpen = false;
    if (result) {
      this.productService.deleteImage(this.productImageUrl)
        .then(res => {
          this.productService.deleteProduct(this.productId).subscribe(r => {
            this.spinnerService.closeSpinner();
            this.loadProduct();
            this.spinnerService.openSpinner();
            this.productId = '';
            this.productImageUrl = '';
          });
        })
        .catch(err => this.errorHandel(err));
    }
  }
  /** End: onModalResult */

  /** start: handel error from server side */
  errorHandel(err) {
    this.isModalOpen  = false;
    this.productId = '';
    this.productId = '';
    this.productImageUrl = '';
    this.spinnerService.closeSpinner();
    this.alertService.pushError('Error: Something wrong');
  }
  /** close: errorHandel */



}
