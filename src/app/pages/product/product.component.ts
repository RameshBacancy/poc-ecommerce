import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  singleProduct: any = { key: '' };
  previousProductDisplayId: string = '';

  products;
  listview = false;
  constructor(private productData: ProductService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.userService.logout();
    this.loadProduct();
  }

  loadProduct() {
    this.productData.getAllProduct().subscribe(res => {
      this.products = res;
    });
  }

  selectedColumn(id) {
    // this.previousProductDisplayId = id;
    document.getElementById(id).setAttribute('class', 'selected');
  }
  selectedtab(id) {
    if (this.previousProductDisplayId) {
      this.deselectedtab(this.previousProductDisplayId);
    }
    this.previousProductDisplayId = id;
    this.singleProduct = this.products.filter(product => product.key === id);
    document.getElementById(id).setAttribute('class', 'tabselected');
  }
  deselectColumn(id) {
    document.getElementById(id).setAttribute('class', 'list');
  }
  deselectedtab(id) {
    this.previousProductDisplayId = '';
    this.singleProduct = { key: '' };
    document.getElementById(id).setAttribute('class', 'tabnotselected');
  }
}
