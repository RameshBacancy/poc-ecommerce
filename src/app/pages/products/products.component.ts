import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { SearchStringPipe } from 'src/app/core/pipe/search-string.pipe';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  singleProduct: any = { key: '' };
  previousProductDisplayId = '';
  selectedSortByValue = 'DEFAULT';
  sortByClicked = false;
  selectedDefault = true;
  selectedLowtoHigh = false;
  selectedHightoLow = false;
  search = '';
  products;
  products1;
  listview = false;

  listPage = 1;
  gridPage = 1;
  gridPageSize = 8;
  listPageSize = 6;
  collectionSize = 100 ;


  constructor(private productData: ProductService,
              private userService: UserService,
              private searchPipe: SearchStringPipe,
              private alertService: AlertService) { }

  ngOnInit() {
    this.userService.logout();
    this.loadProduct();
  }
  // get data
  loadProduct() {
    this.productData.getAllProduct().subscribe(res => {
      this.products = res;
      this.products1 = res;
      this.collectionSize = res.length;
    },
      err => this.OpenDangerAlert(),
      () => this.searchProduct(this.products)
    );
  }

  pageChange() {
    window.scrollTo(0, 0);
  }

  // searching function
  searchProduct(product1?: any) {
    if (!product1) {
      product1 = this.products1;
    }
    this.products = this.searchPipe.transform(product1, 'productTitle', this.search);
  }

  sortByValue(value) {
    this.selectedSortByValue = value;
    this.sortByClicked = false;
    if (value === 'DEFAULT') {
      this.loadProduct();
      this.selectedDefault = true;
      this.selectedLowtoHigh = false;
      this.selectedHightoLow = false;
    }
    if (value === 'PRICE- LOW TO HIGH') {
      this.products.sort((a, b) => {
        return a.productPrice - b.productPrice;
      });
      this.selectedDefault = false;
      this.selectedLowtoHigh = true;
      this.selectedHightoLow = false;
      this.searchProduct(this.products);
    }
    if (value === 'PRICE- HIGH TO LOW') {
      this.products.sort((a, b) => {
        return b.productPrice - a.productPrice;
      });
      this.selectedDefault = false;
      this.selectedLowtoHigh = false;
      this.selectedHightoLow = true;
      this.searchProduct(this.products);
    }
  }

  // function on outside click of sort-by menu
  clickedOutSide() {
    this.sortByClicked = false;
  }

  // function for open details on click product in grid view
  selectedtab(id, i) {
    if (this.previousProductDisplayId) {
      this.deselectedtab(this.previousProductDisplayId);
    }

    if (this.previousProductDisplayId !== id) {
      this.previousProductDisplayId = id;
      this.singleProduct = this.products.filter(product => product.key === id);
      document.getElementById(id).setAttribute('class', 'tabselected');
      if (i % 4 === 1) {
        document.getElementById(id).style.marginLeft = '-254px';
      } else if (i % 4 === 2) {
        document.getElementById(id).style.marginLeft = '-513px';
      } else if (i % 4 === 3) {
        document.getElementById(id).style.marginLeft = '-773px';
      }
    } else {
      this.previousProductDisplayId = '';
    }
  }

  // function to close selected grid product
  deselectedtab(id) {
    this.singleProduct = { key: '' };
    document.getElementById(id).setAttribute('class', 'tabnotselected');
  }

  // function for open details on click product in list view
  selectedColumn(id) {
    document.getElementById(id).setAttribute('class', 'selected');
  }

  // function to close selected list product
  deselectColumn(id) {
    document.getElementById(id).setAttribute('class', 'list');
  }

  // to show an error for no data found
  OpenDangerAlert() {
    this.alertService.pushError('NO DATA FOUND...');
  }
}
