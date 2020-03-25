import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'category', component: CategoryComponent },
      { path: 'category/add', component: AddCategoryComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/add', component: AddProductComponent },
      { path: 'products/edit/:pid', component: AddProductComponent }
    ]
  }
]

@NgModule({
  declarations: [AdminDashboardComponent,CategoryComponent,ProductsComponent,AddProductComponent,AddCategoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
