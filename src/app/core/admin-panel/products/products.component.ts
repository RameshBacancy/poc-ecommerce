import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { Product } from 'src/app/models/product.model';
import { componentFactoryName } from '@angular/compiler';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filterProduct: Product[] = [];
  categories = [];
  filterText: string = '';
  filterCategory: string = '';
  currentPage = 1;
  pageSize = 10;
  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadCategory() {
    this.categoryService.getCategory().subscribe(res => this.categories = res);
  }

  filter() {
    
    var filtered = !this.filterText ? this.products : this.products.filter(product => {
      // console.log(JSON.stringify(Object.values(product)));
      return JSON.stringify(Object.values(product)).toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1;
    })
    console.log(this.filterCategory)
    var filtered = !this.filterCategory ?filtered: filtered.filter(product=>product.productCategory == this.filterCategory);
    console.log(this.filterProduct)
    this.filterProduct = filtered;
  }

  // filterByCategory(category) {
  //   console.log(category);
  //   if (this.filterText) {
  //     this.filterProduct = this.filterProduct.filter(product => product.productCategory == category);
  //   } else {
  //     this.filterProduct = this.products.filter(product => product.productCategory == category);
  //   }
  // }

  loadProduct() {
    this.productService.getAllProduct().subscribe(res => {
      this.loadCategory();
      this.products = res;
      this.filterProduct = res;
    });
  }

  onEditClick(productId) {
    this.router.navigate(['', 'admin', 'dashboard', 'products', 'edit', productId]);
  }
}
