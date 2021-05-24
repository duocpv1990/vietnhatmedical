import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from "../../../../../shared/services/alert.service";
//service
import { EmployeeService } from '../../../services/employee.service';
import { ScheduleService } from '../../../../schedule/services/schedule.service';
import { CustomerService } from "../../../../customer/services/customer.service";

//model
import { EmployeeModel } from "../../../models/employee.model";
import { DeleteEmployeeComponent } from '../dialog/delete-employee/delete-employee.component';
@Component({
  selector: 'app-employee-calender',
  templateUrl: './employee-calender.component.html',
  styleUrls: ['./employee-calender.component.scss']
})
export class EmployeeCalenderComponent implements OnInit {

  constructor(
    public employeeService: EmployeeService, 
    private scheduleService: ScheduleService, //3 lịch
    public activatedRoute: ActivatedRoute,
    public alerService: AlertService,
    public dialog: MatDialog
  ) { }

  //lich cham soc
  displayedColumnsCareCalender =[
    'Ngày',
    'Giờ',
    'Mã KH',
    'Họ tên',
    'Điện thoại',
    'Loại lịch',
    'Liên hệ',
    'Ghi chú',
    'Trạng thái'
  ];
  backendDisplayCalender=[
    'ReminderDate',
    'ReminderTime',
    'CustomerID',
    'CustomerFullNameAndId',
    'CustomerPhone',
    'TypeDescription',
    'ContactTypeDescription',
    'Description',
    'StatusDescription'
  ];
  
  //3 lich
  displayedColumns = [
    "Mã",
    'Ngày',
    'Giờ',
    'Mã KH',
    'Họ tên',
    'Bác sĩ khám',
    'Điều dưỡng',
    'Loại lịch',
    'Ghi chú',
    'Trạng thái'
  ];
  backendDisplayColumns = [
    'ScheduleId',
    'ScheduleDate',
    'ScheduleTime',
    'CustomerId',
    'CustomerFullnameAndId',
    'MainProviderString',
    'MainNurseString',
    'TypeDescription',
    'Notes',
    'StatusDescription'
  ];

  sortScheduleType: number = 0;
  operationSchedules: any;
  bandageChangingSchedules: any;
  examinationSchedules: any;
  careCalender: any;
  employeeId: number;
  displayData: any;
  scheduleList: any;
  errorMsg: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => this.employeeId = +param.get('employeeId'));
    this.getCareCalenderEmployee();
    // this.getAllSchedules();
    this.getScheduleForDoctor();
  }

  // getAllSchedules() {
  //   this.scheduleService.searchSchedule(null, null, null, 1).subscribe(data => {
  //     this.scheduleList = data;
  //     this.sortSchedule();
  //   }, error => {
  //     if (error.status == '401') {
  //       this.errorMsg = 'Bạn không có quyền thực hiện chức năng này!'
  //     }
  //   }
  //   );
  // }

  getScheduleForDoctor(){
    this.employeeService.getScheduleForDoctor(this.employeeId, 1).subscribe(data => {
      this.scheduleList = data.Payload;
      console.log('3 lịch: ',data);
      this.sortSchedule();
    });
  }

  sortSchedule() {
    if (this.sortScheduleType == 0) {
      return this.careCalender;
    }
    if (this.sortScheduleType == 1) {
      this.operationSchedules = this.scheduleList.filter(i => i.Type == 1);
      this.displayData = this.operationSchedules;
    }
    if (this.sortScheduleType == 2) {
      this.examinationSchedules = this.scheduleList.filter(i => i.Type == 2);
      this.displayData = this.examinationSchedules;
    }
    if (this.sortScheduleType == 3) {
      this.bandageChangingSchedules = this.scheduleList.filter(i => i.Type == 3);
      this.displayData = this.bandageChangingSchedules;
    }
    // console.log(this.sortScheduleType);
  }

  getCareCalenderEmployee(){
    this.employeeService.getCalenderEmployee(this.employeeId).subscribe(res => {
        this.careCalender = res.reverse();
        // this.displayData = this.careCalender;
        console.log('lịch chăm sóc của NV:',this.careCalender);
      });
    }

}
