import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NotificationModel } from '../../../models/notification.model';
import { NoticationService } from '../../../services/notification.service';

import { AlertService } from '../../../../../shared/services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.scss']
})
export class CreateNotificationComponent implements OnInit {
  notificationForm: FormGroup

  constructor(
    private dialogRef: MatDialogRef<CreateNotificationComponent>,
    private noticationService: NoticationService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.notificationForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      type: 7
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createNotification() {
    this.noticationService.create(this.notificationForm.value).subscribe(data => {
      this.alertService.changeMessage({
        text: 'Tạo thông báo thành công!',
        color: 'green'
      });
      this.closeDialog();
    })
  }

}
