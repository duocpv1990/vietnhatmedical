import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ScheduleService } from 'src/app/pages/schedule/services/schedule.service';
import { EmployeeService } from 'src/app/pages/employee/services/employee.service';
import { AlertService } from 'src/app/shared/services/alert.service';

import { CustomerRemindersModel } from 'src/app/pages/customer/models/customer-reminder.model';
import { ChangeBandageService } from 'src/app/pages/customer/services/change-bandage.service';
import { ChangeBandageModel } from 'src/app/pages/customer/models/change-bandage.model';
import { ScheduleModel } from "src/app/pages/schedule/models/schedule.model";

@Component({
  selector: 'app-doctor-work-list',
  templateUrl: './doctor-work-list.component.html',
  styleUrls: ['./doctor-work-list.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class DoctorWorkListComponent implements OnInit {

  @Input('currentTime') currentTime: any;
  @Input('currentDate') currentDate: any;
  @Input('accessUser') accessUser: any;
  @Input('fromDate') fromDate: any;
  @Input('toDate') toDate: any;
  @ViewChild('paginatorOperation') paginatorOperation: MatPaginator;
  @ViewChild('paginatorExamination') paginatorExamination: MatPaginator;
  @ViewChild('paginatorBandageChanging') paginatorBandageChanging: MatPaginator;

  constructor(
    public employeeService: EmployeeService, 
    private scheduleService: ScheduleService, //3 lịch
    private alertService: AlertService,
    private router: Router,
    private changeBandageSvc: ChangeBandageService,

  ) { }

  today: string;
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
  // columnsExaminationSchedule: string[] = [
  //   'ScheduleTime',
  //   'CustomerId',
  //   'Customer',
  //   'SurgeryServices',
  //   'Notes',
  //   'Status'
  // ];
  dataSourceBandageChanging: any;

  ngOnInit(): void {
    this.today = new Date().toISOString().slice(0, 10);
    
    this.getScheduleToday(this.today, this.today);
  }

  // getScheduleForDoctor(){
  //   this.employeeService.getScheduleForDoctor(this.accessUser.EmployeeId, 1).subscribe(data => {
  //     console.log('3 lịch: ',data);
  //     this.scheduleList = data.Payload;
      
  //     this.operationSchedules = this.scheduleList.filter(schedule => schedule.Type == 1 && schedule.ReminderDate == this.currentDate); //lich phau
  //     this.dataSourceOperation = new MatTableDataSource(this.operationSchedules);
  //     this.dataSourceOperation.paginator = this.paginatorOperationSchedule;

  //     this.examinationSchedules = this.scheduleList.filter(schedule => schedule.Type == 2 && schedule.ReminderDate == this.currentDate); //lich kham
  //     this.bandageChangingSchedules = this.scheduleList.filter(schedule => schedule.Type == 3 && schedule.ReminderDate == this.currentDate); //lich thay bang
  //     console.log(this.operationSchedules);
      
  //   });
  // }

  getScheduleToday(fromdate, todate){
    this.employeeService.getScheduleByToken(fromdate, todate).subscribe(data => {
      console.log('3 lịch: ',data);
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

  updateStatus(scheduleId: number, newStatus: any){
    let schedule = new ScheduleModel();
    schedule.Status = +newStatus;
    this.scheduleService.update(schedule, scheduleId).subscribe(res => {
      if(this.fromDate == undefined) this.fromDate = this.today;
      if(this.toDate == undefined) this.toDate = this.today;
      this.getScheduleToday(this.fromDate, this.toDate);
    }, null, () => {
      this.alertService.changeMessage({
        color: 'green',
        text: 'Cập nhật trạng thái thành công'
      });
    });
  }

}
