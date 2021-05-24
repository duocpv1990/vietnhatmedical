import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdvisoryScheduleModel } from 'src/app/pages/customer/models/advisory-schedule.model';
import { AdvisoryScheduleService } from 'src/app/pages/customer/services/advisory-schedule.service';
import { CareCallScheduleService } from 'src/app/pages/customer/services/care-call-schedule.service';
import { ScheduleService } from 'src/app/pages/schedule/services/schedule.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProviderService } from "../../../../../../../../services/provider.service";
import { CustomerRemindersModel } from '../../../../../../../../models/customer-reminder.model';
import { CustomerReminderService } from '../../../../../../../../services/customer-reminder.service';

@Component({
  selector: 'app-create-carecallschedule',
  templateUrl: './create-carecallschedule.component.html',
  styleUrls: ['./create-carecallschedule.component.scss']
})
export class CreateCarecallscheduleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateCarecallscheduleComponent>,
    private careCallScheduleService: CareCallScheduleService,
    public alertService: AlertService,
    public providerService: ProviderService,
    public scheduleService: ScheduleService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public route: ActivatedRoute,
    private customerReminderService: CustomerReminderService,
  ) { }
  status: any = '1';
  date: any = Date.now() + 86400 * 1000;
  time: string = '08:00';
  description: string;
  notes: string;
  providerId: number;
  providers: any;
  assisstantList: any;
  assisstantId: number;
  doctorList: object[];
  doctorId: number;
  customerId: number;
  currentUser: any;

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('access_user'));
    setTimeout(() => {
      this.getAllProvider();
      this.getDate();
    }, 30);
  }

  getAllProvider() {
    this.providerService.getAllProvider().subscribe(data => {
      this.doctorList = data.filter(i => i.Type == 1);
      this.assisstantList = data.filter(i => i.Type == 2);
    });
  }

  createCareCallSchedule() {
    let data = new AdvisoryScheduleModel();
    data.Type = 5;
    data.Status = this.status;
    data.OperationId = this.data.operationId;
    data.Notes = this.notes;
    data.ScheduleDate = this.date + 'T' + this.time;
    data.ExaminateDoctorIdList = [+this.doctorId];
    data.MainNurseIdList = [+this.assisstantId];
    console.log("data", data);
    this.careCallScheduleService.createCareCallSchedule(data).subscribe(res => {
      console.log('form gui di', data);
      setTimeout(() => {
        this.alertService.changeMessage({
          color: 'green',
          text: `Tạo lịch gọi chăm sóc thành công!`
        }
        );
      }, 300);
      this.dialogRef.close();
    });
  }

  getDate() {
    let date = new Date(this.date),
      month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    this.date = [year, month, day].join('-');
  }

  closeDialog() {
    this.dialogRef.close();
  }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight) + "px";
  }

  createCustomerReminder() {
    let data = new CustomerRemindersModel();
    data.Type = 3;
    data.EventDate = this.date + 'T' + this.time;
    data.Description = this.description;
    data.ContactType = 1;
    data.EmployeeID = +this.currentUser.EmployeeId;
    data.CustomerID = this.data.customerId;
    data.OperationId = this.data.operationId;
    console.log('model lich hen', data);

    this.customerReminderService.create(data).subscribe(res => {
      this.alertService.changeMessage({
        color: 'green',
        text: `Tạo lịch hẹn thành công!`
      });
      this.closeDialog();
    });
  }
}
