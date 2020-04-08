import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() onViewSidebar = new EventEmitter();
  public viewSideBar: boolean;
  public headerMenu: boolean;
  public openMessageWindow: boolean;
  public showUnreadMessage: boolean;

  constructor(private router: Router, private userService: UserService) {
    this.viewSideBar = false;
    this.headerMenu = false;
    this.openMessageWindow = false;
    this.showUnreadMessage = true;
  }

  ngOnInit() {
  }
  /**
   * Navigates to Dashboard
   */
  public toDashboard() {
  }
  /*** For open header menu */
  public openMenu() {
    this.headerMenu = !this.headerMenu;
  }

  /**
   * For handling click outside event for menu
   */
  public handleClickOutside() {
    this.headerMenu = false;
  }

  public openMessageModal() {
    this.openMessageWindow = !this.openMessageWindow;
  }


  onViewSideBar() {
    this.viewSideBar = !this.viewSideBar;
    this.onViewSidebar.emit(this.viewSideBar);
  }

  onLogOut() {
    this.router.navigate(['admin/auth/login']);
    this.userService.logout();
  }
}
