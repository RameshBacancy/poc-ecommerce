import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories:string[] = [];
  categorySubscription: Subscription;
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    // this.categories = ['Home supplier','Mobile Phone','Office Bag'];
    this.loadCategory();
  }

  loadCategory(){
    this.categorySubscription = this.categoryService.getCategory().subscribe((res:any)=>{
      this.categories = res;
      // for (const key in res) {
      //     this.categories.push({ key:key ,name: res[key]['name'] });          
      // }
      // console.log('----categories----',this.categories);
    })
  }

  onDeleteClick(categoryKey){
    // console.log(categoryKey);
    this.categoryService.deleteCategory(categoryKey).subscribe(res=>{
      // console.log(res);
      this.loadCategory();
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('des call');
    this.categorySubscription.unsubscribe();
  }

}
