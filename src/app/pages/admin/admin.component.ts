import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  viewSideBar: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }
  onViewSidebar(val) {
    this.viewSideBar = val;

  }
  
}
