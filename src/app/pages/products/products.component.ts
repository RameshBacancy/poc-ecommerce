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
  previousProductDisplayId: string = '';
  selectedSortByValue="DEFAULT";
  sortByClicked=false;
  select_Default=true;
  select_Prc_L_to_H=false;
  select_Prc_H_to_L=false;
  search="";
  products;
  products1;
  listview = false;


  constructor(private productData: ProductService,
    private userService: UserService,
    private searchPipe:SearchStringPipe,
    private alertService:AlertService) { }

  ngOnInit() {
    this.userService.logout();
    this.loadProduct();
  }

  loadProduct() {
    this.productData.getAllProduct().subscribe(res => {
      this.products = res;
      this.products1 = res;
    },
    err=>{this.OpenDangerAlert()},
    ()=>{this.searchProduct(this.products)}
    );
  }

  searchProduct(product1 ?:any){
    if(!product1){
      product1=this.products1
    }
    this.products=this.searchPipe.transform(product1,"productTitle", this.search);
  }

  sortByValue(value){
    this.selectedSortByValue=value;
    this.sortByClicked=false;
    if(value=="DEFAULT"){
      this.loadProduct();
      this.select_Default=true;
      this.select_Prc_L_to_H=false;
      this.select_Prc_H_to_L=false;
    } 
    if(value=="PRICE- LOW TO HIGH"){
      this.select_Default=false;
      this.select_Prc_L_to_H=true;
      this.select_Prc_H_to_L=false;
      this.products.sort((a,b)=>{
        return a.productPrice-b.productPrice
      });
      this.searchProduct(this.products);
    }
    if(value=="PRICE- HIGH TO LOW"){
      this.select_Default=false;
      this.select_Prc_L_to_H=false;
      this.select_Prc_H_to_L=true;
      this.products.sort((a,b)=>{
        return b.productPrice-a.productPrice
      });
      this.searchProduct(this.products);
    }
  }

  clickedOutSide(){
    this.sortByClicked=false;
    }

    selectedtab(id, i) {
      if (this.previousProductDisplayId) {
        this.deselectedtab(this.previousProductDisplayId);
      }
  
      if (this.previousProductDisplayId !== id) {
        this.previousProductDisplayId = id;
        this.singleProduct = this.products.filter(product => product.key === id);
        document.getElementById(id).setAttribute('class', 'tabselected');
        if (i % 4 == 1) {
          document.getElementById(id).style.marginLeft = '-254px';
        } else if (i % 4 == 2) {
          document.getElementById(id).style.marginLeft = '-513px';
        } else if (i % 4 == 3) {
          document.getElementById(id).style.marginLeft = '-773px';
        }
      }else{
      this.previousProductDisplayId = '';
      }
  
    }
    deselectedtab(id) {
      // this.previousProductDisplayId = '';
      this.singleProduct = { key: '' };
      document.getElementById(id).setAttribute('class', 'tabnotselected');
    }
    
    selectedColumn(id) {
      document.getElementById(id).setAttribute('class', 'selected');
    }
  
    deselectColumn(id) {
      document.getElementById(id).setAttribute('class', 'list');
    }

    OpenDangerAlert() {
      this.alertService.pushError('NO DATA FOUND...');
    }
}
