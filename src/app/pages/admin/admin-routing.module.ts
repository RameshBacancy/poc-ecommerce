import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditProductComponent } from './products/add-edit-product/add-edit-product.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { AdminComponent } from './admin.component';
import { GuideTestComponent } from './guide-test/guide-test.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'category', component: CategoriesComponent
      },
      {
        path: 'products', component: ProductsComponent
      },
      {
        path: 'products/add', component: AddEditProductComponent
      },
      {
        path: 'products/edit/:id', component: AddEditProductComponent
      },
      {
        path: 'guide-test', component: GuideTestComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
