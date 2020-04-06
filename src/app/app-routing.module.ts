import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ProtectGuard } from './guard/protect.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'products',
    // loadChildren:()=>import('./pages/product/product.module').then(p=>p.ProductModule)
    loadChildren: './pages/products/products.module#ProductsModule'
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: './authentication/authentication.module#AuthenticationModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/dashboard',
    loadChildren: './pages/admin-panel/admin-panel.module#AdminPanelModule',
    canActivate: [ProtectGuard]
  },
  {
    path: 'landing',
    loadChildren: './pages/landing/landing.module#LandingModule',
    canActivate: [ProtectGuard],
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
