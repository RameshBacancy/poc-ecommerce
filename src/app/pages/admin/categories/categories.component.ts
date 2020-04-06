import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CategoryService } from 'src/app/services/category.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  isModalOpen: boolean;
  categoryKey: string = '';
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
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.isModalOpen = false;
    this.isLoaded = true;
    this.loadCategory();
  }

  /** Start: Load all category */
  loadCategory() {
    this.isLoaded = true;
    this.spinnerService.openSpinner();
    this.categoryService.getCategory()
      .subscribe(
        res => {
          this.typeOptions = res;
          this.isLoaded = false;
          this.spinnerService.closeSpinner();
        },
        err => this.errorHandel(err)
      );
  }
  /** close:  loadCategory() */


  /** start: for hide and show button for add  */
  onAddCategoryBtnClick() {
    this.isAddShow = false;
    this.isAdd = true;
    this.isEdit = false;
  }
  /** close: onAddCategoryBtnClick() */

  /** start: for hide and show button for edit */
  onEditCategoryBtnClick(cate: Category) {
    this.isAddShow = false;
    this.isAdd = false;
    if (cate.value) {
      this.category = cate;
      this.isEdit = true;
    }
  }
  /** close: onEditCategoryBtnClick() */

  /** start: when new category add or edit then load all category */
  onAddCategory(e) {
    if (e == 'yes') {
      this.loadCategory();
    }
    this.isEdit = false;
    this.isAdd = false;
    this.isAddShow = true;
  }
  /** close: onaAddCategory() */

  /** start: for delete btn click and open popup modal */
  onDeleteClick(categoryKey) {
    this.categoryKey = categoryKey;
    this.isModalOpen = true;
``  }
  /** close: onDeleteClick() */

  /**Start: for modal popup result for delete caregory */
  onModalResult(result: boolean) {
    this.isModalOpen = false;
    if (result && this.categoryKey !== '') {
      this.spinnerService.openSpinner();
      this.categoryService.deleteCategory(this.categoryKey)
        .subscribe(
          res => {
            this.loadCategory();
            this.spinnerService.closeSpinner();
            this.categoryKey = '';
          },
          err => this.errorHandel(err));
    }
  }
  /** close: onModalResult() */
  
  /** start: handel error from server side */
  errorHandel(err) {
    this.spinnerService.closeSpinner();
    this.isModalOpen = false;
    this.categoryKey = '';
    this.alertService.pushError("Error: Something wrong");
  }
  /** close: errorHandel */
}
