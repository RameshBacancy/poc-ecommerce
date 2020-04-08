import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AddEditProductComponent } from './products/add-edit-product/add-edit-product.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddEditCategoryComponent } from './categories/add-edit-category/add-edit-category.component';
import { ProductsComponent } from './products/products.component';
import { AdminComponent } from './admin.component';
import { GuideTestComponent } from './guide-test/guide-test.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardTestComponent } from './dashboard-test/dashboard-test.component';
import { ChartModule } from 'angular2-highcharts';
import { PieChartComponent } from './dashboard-test/pie-chart/pie-chart.component';
import { SingleLineChartComponent } from './dashboard-test/single-line-chart/single-line-chart.component';
import { MultiLineChartComponent } from './dashboard-test/multi-line-chart/multi-line-chart.component';

@NgModule({
  declarations: [
    AdminComponent,
    ProductsComponent,
    AddEditProductComponent,
    CategoriesComponent,
    AddEditCategoryComponent,
    GuideTestComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardTestComponent,
    DashboardTestComponent,
    PieChartComponent,
    SingleLineChartComponent,
    MultiLineChartComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    AngularFireStorageModule,
    AngularEditorModule,
    ChartModule
  ]
})
export class AdminModule { }
