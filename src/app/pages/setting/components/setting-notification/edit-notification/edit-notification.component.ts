import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { NotificationModel } from '../../../models/notification.model';
import { NoticationService } from '../../../services/notification.service';

import { AlertService } from '../../../../../shared/services/alert.service';

@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styleUrls: ['./edit-notification.component.scss']
})
export class EditNotificationComponent implements OnInit {
  notification: NotificationModel;

  constructor(
    public dialogRef: MatDialogRef<EditNotificationComponent>,
    public noticationService: NoticationService,
    public alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getNotificationDetail();
    })

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getNotificationDetail() {
    this.noticationService.getNotiDetail(this.data.notificationId).subscribe(res => {
      this.notification = res;
    })
  }

  editNotification() {
    this.noticationService.update(this.notification, this.data.notificationId).subscribe(res => {
      this.alertService.changeMessage({
        text: 'Cập nhật thành công!',
        color: 'green'
      });
      this.closeDialog();
    })
  }

}
