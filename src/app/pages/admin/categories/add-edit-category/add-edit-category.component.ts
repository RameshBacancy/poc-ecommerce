import { Component, OnInit, Output, SimpleChanges, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {
  @Output() addCategory = new EventEmitter<any>();
  @Input('category') category = { name: '', value: '' };
  categoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private _formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private alertService: AlertService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    //for edit category set value which is come from input
    this.categoryForm.controls['categoryName'].setValue(this.category.name);
  }

  ngOnInit() {
    // load categoryForm
    this.categoryForm = this._formBuilder.group({
      categoryName: [this.category.name]
    });
  }

  /** Start: for categoryForm submit and add , edit  */
  onCategoryFormSubmit(): void {
    this.spinnerService.openSpinner();
    let categoryName = this.categoryForm.get('categoryName').value;
    if (this.category.value !== '' && categoryName !== this.category.name) {
      // this.category.name = categoryName;
      this.categoryService.editCategory({ name: categoryName, value: this.category.value })
        .subscribe(
          res => {
            this.spinnerService.closeSpinner();
            this.category = { name: '', value: '' };
            return this.addCategory.emit('yes');
          },
          err => this.errorHandel(err));
    }
    else if (categoryName != '' && this.category.value === '') {
      this.categoryService.addCategory(categoryName)
      .subscribe(
        res => this.addCategory.emit('yes'),
        err => this.errorHandel(err));
    }
    else {
      this.spinnerService.closeSpinner();
      return this.addCategory.emit('not');
    }
  }
  /** End: onCategoryFormSubmit  */

  errorHandel(err) {
    this.spinnerService.closeSpinner();
    this.alertService.pushError('Error: Something wrong');
    return this.addCategory.emit('not');
  }
}
