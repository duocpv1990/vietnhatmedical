import { Component, OnInit } from '@angular/core';
//model
import { CustomerRemindersModel } from '../../../models/customer-reminder.model';

//service
import { CustomerReminderService } from '../../../services/customer-reminder.service';
import { EmployeeService } from '../../../../employee/services/employee.service'
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../../shared/services/alert.service';
import { OperationService } from "../../../services/operation.service";
import { CustomerService } from "../../../services/customer.service";

import { BaseComponent } from "../../../../../shared/components/base.component";

@Component({
  selector: 'app-schedule-booking',
  templateUrl: './schedule-booking.component.html',
  styleUrls: ['./schedule-booking.component.scss']
})
export class ScheduleBookingComponent extends BaseComponent implements OnInit {
  operationId: number;

  constructor(
    public customerService: CustomerService,
    public operationSvc: OperationService,
    private customerReminderService: CustomerReminderService,
    private employeeService: EmployeeService,
    private activeRoute: ActivatedRoute,
    private alertService: AlertService,
    public router: Router
  ) {
    super(router); this.checkToken();
    this.isAccessAdd = this.checkAccess('api/customerreminder,POST');
  }
  isAccessAdd: any;
  // reminderList: any;
  // employeeList: any;
  type: any = '2';
  dayDate: any = Date.now() + 86400 * 1000;
  hourDate: string = '08:00';
  description: string;
  contactType: any = '3';
  // employeeId: number;
  customerId: number;
  sale: any;
  currentUser: any;
  operations: any;

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('access_user'));
    this.sale = this.currentUser.FullName;
    this.activeRoute.paramMap.subscribe(param => this.customerId = +param.get('customerId'));
    this.getDate();
    this.getOperation();
  }

  getOperation() {
    this.operationSvc.getOperationInfoByCustomerId(this.customerId).subscribe(data => {
      this.operations = data.reverse();
      // console.log('list service option', this.operations);
    });
  }

  getDate() {
    let date = new Date(this.dayDate),
      month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    this.dayDate = [year, month, day].join('-');
  }

  chooseOperationId(operationId) {
    this.operationId = operationId;
    console.log('operationId', this.operationId);

  }

  createCustomerReminder() {
    let data = new CustomerRemindersModel();
    data.Type = +this.type;
    data.EventDate = this.dayDate + 'T' + this.hourDate;
    data.Description = this.description;
    data.ContactType = +this.contactType;
    data.EmployeeID = +this.currentUser.EmployeeId;
    data.CustomerID = this.customerId;
    data.OperationId = this.operationId;
    this.customerReminderService.create(data).subscribe(res => {
      this.alertService.changeMessage({
        color: 'green',
        text: `Tạo lịch hẹn thành công!`
      });
      // this.router.navigate([`/pages/customer/${this.customerId}`], { queryParams: { tab: 2}});
      // setTimeout(() => this.router.navigate([`/pages/customer/${this.customerId}`], { queryParams: { tab: 3}}), 30);
      this.router.navigate([`/pages/schedule`]);
    });
  }

  cancelCreate() {
    this.router.navigate([`/pages/customer/${this.customerId}`], { queryParams: { tab: 0 } });
  }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight) + "px";
  }

}
