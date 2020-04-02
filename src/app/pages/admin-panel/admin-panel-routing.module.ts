import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { AddEditProductComponent } from './products/add-edit-product/add-edit-product.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';


const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
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
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
