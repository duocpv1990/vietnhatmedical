import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticationService } from 'src/app/pages/setting/services/notification.service';
import { NotificationModel } from '../../../../pages/setting/models/notification.model';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: NotificationModel[];
  notificationDetail: NotificationModel;
  isShow = false;

  constructor(
    private noticationService: NoticationService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getNotification();
    });

  }

  getNotification() {
    this.noticationService.getNotiList().subscribe(data => {
      this.notifications = data.filter(item => item.Type == 2);
      console.log(this.notifications);

    })
  }

  viewNotificationDetail(notificationId) {
    this.noticationService.getNotiDetail(notificationId).subscribe(res => {
      this.notificationDetail = res;
      console.log('notificationDetail', this.notificationDetail);
      this.isShow = !this.isShow;
    })
  }

  hideNotificationDetail() {
    this.isShow = !this.isShow;
  }

}
