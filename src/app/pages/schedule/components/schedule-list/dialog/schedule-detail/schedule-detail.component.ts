import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ScheduleService } from 'src/app/pages/schedule/services/schedule.service';
import { ProviderService } from 'src/app/pages/employee/services/provider.service';
import { ScheduleReminderService } from 'src/app/pages/schedule/services/schedule-reminder.service';
import { CustomerReminderService } from 'src/app/pages/customer/services/customer-reminder.service';
import { CustomerRemindersModel } from 'src/app/pages/customer/models/customer-reminder.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss']
})
export class ScheduleDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ScheduleDetailComponent>,
    public alertService: AlertService,
    public providerService: ProviderService,
    public scheduleService: ScheduleService,
    private customerReminderService: CustomerReminderService,
    private scheduleReminderService: ScheduleReminderService, //lịch hẹn
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) { }

  currentSchedule: any;
  type: any;
  isShow: boolean = true;
  employeeList: any;
  status: any;
  dayDate: string;
  hourDate: string;
  description: string;
  contactType: any;
  employeeId: number;
  customerId: number;
  sale: any;

  ngOnInit(): void {
    setTimeout(() => {
      this.getCurrentScheduleReminder();
    }, 100);

  }

  getCurrentScheduleReminder() {
    this.scheduleReminderService.list().subscribe(res => {
      this.currentSchedule = res.find(schedule => schedule.CustomerRemindersID == this.data.customerRemindersID);
      console.log(this.currentSchedule);
      this.sale = this.currentSchedule.EmployeeFullName;
      this.type = "" + this.currentSchedule.Type;
      this.status = this.currentSchedule.Status + '';
      this.dayDate = this.currentSchedule.EventDate.split('T')[0];
      this.hourDate = this.currentSchedule.EventDate.split('T')[1];
      this.description = this.currentSchedule.Description;
      this.contactType = "" + this.currentSchedule.ContactType;
      this.employeeId = this.currentSchedule.EmployeeID;
    });
  }

  chooseStatus(status: number) {
    if (status == 1) this.status = 2;
    else this.status = 1;
  }

  updateCustomerHistory() {
    let model = new CustomerRemindersModel();
    model.Type = +this.type;
    model.Status = +this.status;
    model.EventDate = this.dayDate + "T" + this.hourDate;
    model.Description = this.description;
    model.ContactType = +this.contactType;
    console.log(model);
    this.customerReminderService.update(model, this.currentSchedule.CustomerRemindersID).subscribe(res => {
      this.alertService.changeMessage({
        text: 'Cập nhật lịch hẹn thành công',
        color: 'green'
      });
      this.closeDialog();
    });
  }

  deleteCustomerHistory() {
    this.customerReminderService.delete(this.currentSchedule.CustomerRemindersID).subscribe(res => {
      this.alertService.changeMessage({
        text: 'Xóa lịch hẹn thành công',
        color: 'green'
      });
      this.closeDialog();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  redirectCustomerInfo() {
    this.router.navigateByUrl('/pages/customer/' + this.currentSchedule.CustomerID);
    this.closeDialog();
  }

}
