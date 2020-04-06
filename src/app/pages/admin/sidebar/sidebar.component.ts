import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor() { }
  isSubmenu: boolean;

  arrowimg: string = 'arrow-right-white';
  submenuFun() {
    this.isSubmenu = !this.isSubmenu;
    this.arrowimg = this.arrowimg === 'arrow-down-white' ? 'arrow-right-white' : 'arrow-down-white' ;
  }

  ngOnInit() {
  }

}
