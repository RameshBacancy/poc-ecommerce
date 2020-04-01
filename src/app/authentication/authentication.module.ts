import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login' },
  { path: 'auth/login', component: LoginComponent },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthenticationModule { }
