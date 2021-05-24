import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { NotificationModel } from '../../models/notification.model';
import { NoticationService } from '../../services/notification.service';

import { CreateNotificationComponent } from './create-notification/create-notification.component';
import { EditNotificationComponent } from './edit-notification/edit-notification.component';
import { DeleteNotificationComponent } from './delete-notification/delete-notification.component';

@Component({
  selector: 'app-setting-notification',
  templateUrl: './setting-notification.component.html',
  styleUrls: ['./setting-notification.component.scss']
})
export class SettingNotificationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: any;
  displayedColumns = ["Tiêu đề", "Nội dung", "Tác vụ"];
  notifications: NotificationModel[];

  constructor(
    public dialog: MatDialog,
    private noticationService: NoticationService
  ) { }

  ngOnInit(): void {
    this.getNotification();
  }

  getNotification() {
    this.noticationService.getNotiList().subscribe(data => {
      this.notifications = data.filter(item => item.Type === 7).reverse();
      this.dataSource = new MatTableDataSource(this.notifications);
      this.dataSource.paginator = this.paginator;
    })
  }

  createNotification() {
    this.dialog.open(CreateNotificationComponent).afterClosed().subscribe(() => {
      this.getNotification();
    });
  }

  editNotification(notificationId) {
    this.dialog.open(EditNotificationComponent, {
      data: {
        notificationId: notificationId
      }
    }).afterClosed().subscribe(() => {
      this.getNotification();
    });
  }

  deleteNotification(notificationId) {
    this.dialog.open(DeleteNotificationComponent, {
      data: {
        notificationId: notificationId
      }
    }).afterClosed().subscribe(() => {
      this.getNotification();
    });
  }

}
