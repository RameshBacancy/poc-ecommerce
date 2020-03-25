import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  product: FormGroup;
  productId: string
  //single product
  singleP: Product = {
    productCategory: '',
    productDeliveryType: '',
    productDetail: '',
    productImageUrl: '',
    productLink: '',
    productPrice: 0,
    productSiteLink: '',
    productSiteName: '',
    productTitle: '',
  };
  categories: string[] = [];
  productSubscription: Subscription
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.productId = param.get('pid');
      this.loadCategory();
    })
  }


  

  loadSingleProduct(pid) {
    this.productService.getSingleProduct(pid).subscribe((res: Product) => { 
      this.singleP = res;
      this.loadProductForm();
    });
  }

  loadCategory() {
    this.productSubscription = this.categoryService.getCategory().subscribe((res: any) => {
      this.categories = res;
      if(this.productId){
        this.loadSingleProduct(this.productId);
      }else{
        this.loadProductForm();
      }
    })
  }

  loadProductForm() {
    this.product = new FormGroup({
      productCategory: new FormControl(this.singleP.productCategory, Validators.required),
      productTitle: new FormControl(this.singleP.productTitle, Validators.required),
      productDetail: new FormControl(this.singleP.productDetail, Validators.required),
      productImageUrl: new FormControl(this.singleP.productImageUrl, Validators.required),
      productLink: new FormControl(this.singleP.productLink, Validators.required),
      productPrice: new FormControl(this.singleP.productPrice, Validators.required),
      productDeliveryType: new FormControl(this.singleP.productDeliveryType, Validators.required),
      productSiteName: new FormControl(this.singleP.productSiteName, Validators.required),
      productSiteLink: new FormControl(this.singleP.productSiteLink, Validators.required)
    })
  }

  getNumberOrNot() {
    return /^[0-9]$/g.test(this.product.get('productPrice').value)
  }

  getUrlOrNot(url) {
    let pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    return pattern.test(this.product.get(url).value);
  }

  onProductSubmit() {
    if (this.productId) {
      this.productService.editProduct(this.productId, this.product.value).subscribe(res => {
        this.router.navigate(['', 'admin', 'dashboard', 'products']);
        this.product.reset();
      })
    } else {
      this.productService.addProduct(this.product.value).subscribe(res => {
        this.router.navigate(['', 'admin', 'dashboard', 'products']);
        this.product.reset();
      })
    }

  }

  onDeleteProduct(){
    this.productService.deleteProduct(this.productId).subscribe(res=>{
      this.router.navigate(['', 'admin', 'dashboard', 'products']);
        this.product.reset();
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.productSubscription.unsubscribe();
  }
}
