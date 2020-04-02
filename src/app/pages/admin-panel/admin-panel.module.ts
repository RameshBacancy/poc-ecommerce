import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { LandingModule } from '../landing/landing.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AddEditProductComponent } from './products/add-edit-product/add-edit-product.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddEditCategoryComponent } from './categories/add-edit-category/add-edit-category.component';
import { ProductsComponent } from './products/products.component';


@NgModule({
  declarations: [
    AdminPanelComponent,
    ProductsComponent,
    AddEditProductComponent,
    CategoriesComponent,
    AddEditCategoryComponent,
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    LandingModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    AngularFireStorageModule,
    AngularEditorModule
  ]
})
export class AdminPanelModule { }
