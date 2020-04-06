import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  }
];

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductModule { }
