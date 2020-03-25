import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  error:string;
  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.login = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLoginSubmit() {
    console.log('click');
    console.log(this.login.value);
    this.adminService.login(this.login.value).subscribe((res=>{
      this.router.navigate(['','admin','dashboard']);
      this.error = '';
      this.login.reset();
    })
    ,((err)=>{
      console.log(err.error.error.message);
      this.error = err.error.error.message;
      this.login.reset();

      this.router.navigate(['','admin','auth','login']);
    }));
  }

}
