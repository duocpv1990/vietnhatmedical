import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// component
import { LogoutDialogComponent } from "./logout-dialog/logout-dialog.component";
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  user: any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('access_user'));
  }

  openLogoutForm() {
    this.dialog.open(LogoutDialogComponent, {
    });
  }

  openNotification() {
    this.dialog.open(NotificationComponent)
  }
}

