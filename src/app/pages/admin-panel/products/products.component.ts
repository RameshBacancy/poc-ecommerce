import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  isProductListShow: boolean = false;
  constructor(
    private router: Router,
    private productService: ProductService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit() {
    this.isProductListShow = false;
    this.spinnerService.openSpinner();
    this.loadProduct();
    this.timeOut();
  }


  /** Start: load all product and store in this.product */
  loadProduct() {
    this.productService.getAllProduct().subscribe((res: Product[]) => {
      this.products = res;
      this.isProductListShow = true;
      this.spinnerService.closeSpinner();
    });
  }
  /** End: loadProduct */

  /** Start : for close timeout after sometime if res not come */
  timeOut() {
    setTimeout(() => {
      this.isProductListShow = true;
      this.spinnerService.closeSpinner();
    }, 10000);
  }
  /** End : timeOut */

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


  /** Start: on product delete button click and delete product first delete image 
   * form storage and then after delete product
   * */
  onDeleteProductClick(productId, productImageUrl) {
    if (confirm('Are you sure?')) {
      this.productService.deleteImage(productImageUrl)
        .then(res => {
          this.timeOut();
          this.productService.deleteProduct(productId).subscribe(r => {
            this.spinnerService.closeSpinner();
            this.loadProduct();
            this.spinnerService.openSpinner();
          });
        })
        .catch(err => {
          // console.log('--error--', err.message);
          window.alert('Error: Something wrong');
          this.spinnerService.openSpinner();
        })
    }
  }
  /** End: oneDeleteProductClick */
}
