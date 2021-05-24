import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NoticationService } from '../../../services/notification.service';
import { AlertService } from '../../../../../shared/services/alert.service';

@Component({
  selector: 'app-delete-notification',
  templateUrl: './delete-notification.component.html',
  styleUrls: ['./delete-notification.component.scss']
})
export class DeleteNotificationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteNotificationComponent>,
    public noticationService: NoticationService,
    public alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteNotification() {
    this.noticationService.delete(this.data.notificationId).subscribe(res => {
      this.alertService.changeMessage({
        text: 'Xóa thành công!',
        color: 'green'
      });
      this.closeDialog();
    });
  }

}
