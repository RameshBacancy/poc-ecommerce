import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categoryName:string = '';
  constructor(
    private router: Router,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {

  }

  onClick(){

    this.categoryService.addCategory(this.categoryName).subscribe(res=>{
      console.log('---componetn---',res);
      this.router.navigate(['','admin','dashboard','category']);
      this.categoryName = '';
    })
  }
}
