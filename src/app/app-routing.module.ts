import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './guard/admin.guard';
import { AdminProtectedGuard } from './guard/admin-protected.guard';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [AdminAuthGuard] 
  },
  {
    path: 'admin/dashboard',
    loadChildren: () => import('./core/admin-panel/admin.module').then(m => m.AdminModule),
    canActivate: [AdminProtectedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
