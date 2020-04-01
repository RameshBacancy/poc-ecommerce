import { Component, OnInit, Output, SimpleChanges, Input, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'protractor';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { SpinnerService } from 'src/app/services/spinner.service';

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
    private spinnerService: SpinnerService
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
    if (this.category.value !== '' && categoryName !== this.category.value) {
      this.category.name = categoryName;
      this.categoryService.editCategory(this.category).subscribe(res => {
        this.spinnerService.closeSpinner();
        this.category = { name: '', value: '' };
        return this.addCategory.emit('yes');
      });
    }
    else if (categoryName != '' && this.category.value === '') {
      this.categoryService.addCategory(categoryName).subscribe(res => this.addCategory.emit('yes'));
    }
    else {
      this.spinnerService.closeSpinner();
      return this.addCategory.emit('not');
    }
  }
  /** End: onCategoryFormSubmit  */

}
