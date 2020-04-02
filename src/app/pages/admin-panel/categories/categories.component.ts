import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  isAddShow: boolean = true;
  isAdd: boolean = false;
  isEdit: boolean = false;
  category: Category = { name: '', value: '' };
  typeOptions: Category[] = [
  ];
  isLoaded: boolean = false;
  constructor(
    private categoryService: CategoryService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit() {
    this.isLoaded = true;
    this.loadCategory();
  }

  loadCategory() {
    this.isLoaded = true;
    this.spinnerService.openSpinner();
    this.timeOut();
    this.categoryService.getCategory().subscribe(res => {
      this.typeOptions = res;
      this.isLoaded = false;
      this.spinnerService.closeSpinner();
    },
      err => {
        // console.log(err.message);
        this.spinnerService.closeSpinner();
        window.alert("Error: Something wrong");
      });
  }

  timeOut() {
    setTimeout(() => {
      this.spinnerService.closeSpinner();
      this.isLoaded = false;
    }, 10000);
  }

  onAddCategoryBtnClick() {
    this.isAddShow = false;
    this.isAdd = true;
    this.isEdit = false;
  }
  onEditCategoryBtnClick(cate: Category) {
    this.isAddShow = false;
    this.isAdd = false;
    if (cate.value) {
      this.category = cate;
      this.isEdit = true;
      // console.log(this.category);
    }
    // this.isAddShow = !this.isAddShow;
  }

  onAddCategory(e) {
    if (e == 'yes') {
      this.loadCategory();
    }
    this.isEdit = false;
    this.isAdd = false;
    this.isAddShow = true;
  }

  onDeleteClick(categoryKey) {
    // console.log('call', categoryKey);
    if (confirm('Are you sure?')) {
      this.spinnerService.openSpinner();
      this.categoryService.deleteCategory(categoryKey).subscribe(res => {
        this.loadCategory();
        this.spinnerService.closeSpinner();
      },
        err => {
          // console.log(err.message);
          this.spinnerService.closeSpinner();
          window.alert("Error: Something wrong");
        })
    }
  }

}
