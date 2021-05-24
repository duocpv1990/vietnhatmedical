import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';


import { ScheduleReminderService } from 'src/app/pages/schedule/services/schedule-reminder.service';
import { CustomerReminderService } from 'src/app/pages/customer/services/customer-reminder.service';

import { CustomerRemindersModel } from "../../../customer/models/customer-reminder.model";
import { AlertService } from 'src/app/shared/services/alert.service';
import { ScheduleDetailComponent } from "../../../schedule/components/schedule-list/dialog/schedule-detail/schedule-detail.component";
import { ScheduleService } from "../../../schedule/services/schedule.service";
import { EmployeeService } from '../../../employee/services/employee.service'
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ScheduleModel } from 'src/app/pages/schedule/models/schedule.model';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss']
})
export class WorkListComponent implements OnInit {

  @ViewChild('paginatorCallSchedule') paginatorCallSchedule: MatPaginator;
  @ViewChild('paginatorScheduleReminder') paginatorScheduleReminder: MatPaginator;
  @ViewChild('paginatorOperation') paginatorOperation: MatPaginator;
  @ViewChild('paginatorExamination') paginatorExamination: MatPaginator;
  @ViewChild('paginatorBandageChanging') paginatorBandageChanging: MatPaginator;

  selectedDay: string;
  scheduleType = 0;
  isShow: number;
  accessUser: any;
  positionId: number;
  position: string;
  employeeId: number;
  customerReminder: any;
  currentTime: string;
  currentDate: string;
  today: string;
  isDoctor: boolean;
  fromDate: any;
  toDate: any;
  callSchedule: any;
  dataSourceCallSchedule: any;
  scheduleList: any;
  operationSchedules: any;
  examinationSchedules: any;
  bandageChangingSchedules: any;
  examinationScheduleStatus: any = '1';
  dataSourceOperation: any;
  columnsSchedule: string[] = [
    'ScheduleTime',
    'CustomerId',
    'Customer',
    'SurgeryServices',
    'Notes',
    'Status'
  ];

  dataSourceExamination: any;
  dataSourceBandageChanging: any;
  displayedColumnsCallSchedule: string[] = [
    'Giờ',
    'Mã KH',
    'Họ tên',
    'Điện thoại',
    'Ghi chú',
    'Trạng thái'
  ];
  scheduleReminder: any;
  dataSourceScheduleReminder: any;
  displayedColumnsScheduleReminder: string[] = [
    'Giờ',
    'Mã KH',
    'Họ tên',
    'Điện thoại',
    'Ghi chú',
    'Trạng thái'
  ];



  constructor(
    private scheduleReminderService: ScheduleReminderService,
    private customerReminderService: CustomerReminderService,
    private alertService: AlertService,
    private router: Router,
    public dialog: MatDialog,
    private scheduleService: ScheduleService,
    public employeeService: EmployeeService,
  ) {
    this.accessUser = JSON.parse(localStorage.getItem('access_user'));
    this.employeeId = +this.accessUser.EmployeeId;
    this.position = this.accessUser.PositionName;
  }



  ngOnInit(): void {
    let date = new Date();
    let day = (date.getDate() < 10 ? "0" : "") + date.getDate();
    let month = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
    let year = date.getFullYear();
    this.selectedDay = year + "-" + month + "-" + day;

    switch (this.position.toLowerCase()) {
      case ('bác sĩ' || 'điều dưỡng'):
        this.isShow = 1;
        break;
      case 'lễ tân':
        this.isShow = 2;
        break;
      case 'nhân viên kinh doanh':
        this.isShow = 3;
        break;
      case 'chăm sóc khách hàng':
        this.isShow = 4;
        break;
      default:
        this.isShow = 3;
    }


    // if (this.position.toLowerCase() == 'bác sĩ' || this.position.toLowerCase() == 'điều dưỡng') {
    //   this.isDoctor = true;
    // }
    // else this.isDoctor = false;

    this.getCurrentDate();
    setTimeout(() => this.getCustomerReminder(this.today, this.today), 100);
    setTimeout(() => this.getScheduleToday(this.today, this.today), 100);
  }

  getCustomerReminder(fromdate, todate) {
    // this.scheduleReminderService.getCustomerReminderByEmployeeId(this.employeeId).subscribe(res => {
    // this.callSchedule = res.filter(schedule => schedule.Type == 2 && schedule.ReminderDate == this.currentDate).sort((a,b) => a.Status - b.Status); //lịch gọi
    // this.scheduleReminder = res.filter(schedule => schedule.Type == 1 && schedule.ReminderDate == this.currentDate).sort((a,b) => a.Status - b.Status); //lịch hẹn
    this.scheduleService.getReminderByToken(fromdate, todate).subscribe(res => {
      this.callSchedule = res.filter(schedule => schedule.Type == 2).sort((a, b) => a.Status - b.Status); //lịch gọi
      this.scheduleReminder = res.filter(schedule => schedule.Type == 1).sort((a, b) => a.Status - b.Status); //lịch hẹn
      this.dataSourceCallSchedule = new MatTableDataSource(this.callSchedule);

      setTimeout(() => this.dataSourceCallSchedule.paginator = this.paginatorCallSchedule);
      this.dataSourceScheduleReminder = new MatTableDataSource(this.scheduleReminder);
      setTimeout(() => this.dataSourceScheduleReminder.paginator = this.paginatorScheduleReminder);
    });
  }

  updateStatus(scheduleId: number, status: number) {
    let newStatus: number;
    status == 1 ? newStatus = 2 : newStatus = 1;
    let reminder = new CustomerRemindersModel();
    reminder.Status = newStatus;
    this.customerReminderService.update(reminder, scheduleId).subscribe(res => {
      if (this.fromDate == undefined) this.fromDate = this.today;
      if (this.toDate == undefined) this.toDate = this.today;
      this.getCustomerReminder(this.today, this.today);
    }, null, () => {
      this.alertService.changeMessage({
        color: 'green',
        text: 'Cập nhật trạng thái thành công'
      });
    });
  }
  updateScheduleStatus(scheduleId: number, newStatus: any) {
    let schedule = new ScheduleModel();
    schedule.Status = +newStatus;
    this.scheduleService.update(schedule, scheduleId).subscribe(res => {
      if (this.fromDate == undefined) this.fromDate = this.today;
      if (this.toDate == undefined) this.toDate = this.today;
      this.getScheduleToday(this.today, this.today);
    }, null, () => {
      this.alertService.changeMessage({
        color: 'green',
        text: 'Cập nhật trạng thái thành công'
      });
    });
  }
  openDetailForm(reminder) {

    this.dialog.open(ScheduleDetailComponent, {
      data: {
        customerRemindersID: reminder.CustomerRemindersID
      }
    }).afterClosed().subscribe(() => {
      if (this.fromDate == undefined) this.fromDate = this.today;
      if (this.toDate == undefined) this.toDate = this.today;
      this.getCustomerReminder(this.fromDate, this.toDate);
    });
  }

  getScheduleToday(fromdate, todate) {
    this.employeeService.getScheduleByToken(fromdate, todate).subscribe(data => {

      this.scheduleList = data;
      this.operationSchedules = this.scheduleList.filter(schedule => schedule.Type == 1);//lich phau
      this.examinationSchedules = this.scheduleList.filter(schedule => schedule.Type == 2); //lich kham
      this.bandageChangingSchedules = this.scheduleList.filter(schedule => schedule.Type == 3); //lich thay bang

      this.dataSourceOperation = new MatTableDataSource(this.operationSchedules); //lich phau);
      this.dataSourceExamination = new MatTableDataSource(this.examinationSchedules); //lich kham;
      this.dataSourceBandageChanging = new MatTableDataSource(this.bandageChangingSchedules); //lich thay bang;
      setTimeout(() => {
        this.dataSourceOperation.paginator = this.paginatorOperation;
        this.dataSourceExamination.paginator = this.paginatorExamination;
        this.dataSourceBandageChanging.paginator = this.paginatorBandageChanging;
      }, 300);
    });
  }

  getCurrentDate() {
    let date = new Date();
    this.today = date.toISOString().slice(0, 10); // yyy-mm-dd
    this.currentDate = this.today.split('-').reverse().join('/'); // dd/mm/yyy
    let days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    if (date.getDate() < 10 && date.getMonth() < 9) {
      this.currentTime = `${days[date.getDay()]}, ngày 0${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()}`;
      // this.currentDate = `0${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()}`;
    }
    else if (date.getDate() >= 10 && date.getMonth() < 9) {
      this.currentTime = `${days[date.getDay()]}, ngày ${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()}`;
      // this.currentDate = `${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()}`;
    }
    else if (date.getDate() < 10 && date.getMonth() >= 9) {
      this.currentTime = `${days[date.getDay()]}, ngày 0${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      // this.currentDate = `0${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
    else {
      this.currentTime = `${days[date.getDay()]}, ngày ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      // this.currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  }

  chooseScheduleType(scheduleType: number) {
    this.scheduleType = scheduleType;
    // console.log(this.scheduleType);

  }
}
