import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'
import { LoginComponent } from './login/login.component'; 
import { RegistrationComponent } from './registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { from } from 'rxjs';



const routes: Routes = [
  { path: '', redirectTo: 'auth/login' },
  { path: 'auth/login', component: LoginComponent }
  // { path: 'auth/registration',component: RegistrationComponent },
  // { path: 'auth/reset-password' ,component: ResetPasswordComponent }
];


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthenticationModule { }
