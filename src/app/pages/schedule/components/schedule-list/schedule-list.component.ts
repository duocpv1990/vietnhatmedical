import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

//component
import { CreateScheduleComponent } from "./dialog/create-schedule/create-schedule.component";
import { BaseComponent } from "../../../../shared/components/base.component";
import { ScheduleDetailComponent } from "./dialog/schedule-detail/schedule-detail.component";
import { DetailMedicalScheduleComponent } from "../../../customer/components/customer-detail/customer-service/customer-service-detail/components/medical-schedule/dialog/detail-medical-schedule/detail-medical-schedule.component";
import { DetailChangeBandageComponent } from "../../../customer/components/customer-detail/customer-service/customer-service-detail/components/change-bandage/dialog/detail-change-bandage/detail-change-bandage.component";

//service
import { ScheduleService } from '../../services/schedule.service';
import { ScheduleReminderService } from '../../services/schedule-reminder.service';
import { CustomerService } from "../../../customer/services/customer.service";
import { EmployeeService } from '../../../employee/services/employee.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent extends BaseComponent implements OnInit {

  @ViewChild('paginatorSchedule', { static: false }) paginatorSchedule: MatPaginator;
  @ViewChild('paginatorReminder', { static: false }) paginatorReminder: MatPaginator;
  accessUser: any;
  position: string;
  showPhone = true;
  onAnnouce = false;

  constructor(
    private scheduleService: ScheduleService, //3 lịch
    private scheduleReminderService: ScheduleReminderService, //lịch hẹn
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    public router: Router
  ) {
    super(router); this.checkToken();
    this.isAccessAllReminder = this.checkAccess('api/customerreminder,GET');
    this.isAccessMyReminder = this.checkAccess('api/customerReminder/employee,GET');
    this.isAccessAllSchedule = this.checkAccess('api/schedule/search,GET');
    this.isAccessMySchedule = this.checkAccess('api/schedule/username,GET');

  }
  isAccessAllReminder: any;
  isAccessMyReminder: any;

  isAccessAllSchedule: any;
  isAccessMySchedule: any;
  sortScheduleType = 0;
  employeeList: any;

  doctorId: number;
  operationSchedules: any;
  examinationSchedules: any;
  bandageChangingSchedules: any;
  providerList: any;
  scheduleList: any;
  scheduleReminderList: any;
  displayData: any;
  displayDataReminder: any;
  errorMsg: any;
  customerList: any
  currentLoginEmployee: any;
  employeeId: number;
  isShowMyCustomer: boolean = true;
  myReminder: any;
  fromDate: string;
  toDate: string;
  searchData: any;
  mySchedule: any;
  dataSourceReminder: any;
  displayedColumnsReminder: string[] = [
    'Ngày',
    'Giờ',
    'Mã KH',
    'Họ tên',
    'Điện thoại',
    'Sale phụ trách',
    'Loại lịch',
    'Ghi chú',
    'Trạng thái'
  ];
  dataSourceSvcSchedule: any;
  displayedColumnsSvcSchedule = [
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

  ngOnInit(): void {
    let date = new Date();
    this.fromDate = date.toISOString().split('T')[0];
    date.setDate(date.getDate() + 6);
    this.toDate = date.toISOString().split('T')[0];

    this.accessUser = JSON.parse(localStorage.getItem('access_user'));
    this.position = this.accessUser.PositionName;
    if (this.position == 'Chăm sóc khách hàng' || this.position == 'Lễ tân') {
      this.showPhone = !this.showPhone;
    }
    this.getAllSchedules();
    this.getAllReminder();
    this.getAllProvider();
    this.getMySchedule();
    this.getMyReminder();
  }


  openChooseCustomerForm(type: number) {
    this.dialog.open(CreateScheduleComponent, {
      data: { type: type }
    });
  }

  getAllSchedules() {
    this.isShowMyCustomer = false;
    if (this.fromDate == undefined) this.fromDate = null;
    if (this.toDate == undefined) this.toDate = null;
    if (this.doctorId == undefined) this.doctorId = null;

    this.scheduleService.searchSchedule(this.fromDate, this.toDate, this.doctorId, 1).subscribe(data => {
      this.scheduleList = data;
      // console.log('3 lịch:',this.scheduleList);
      if (this.scheduleList.lenght == 0) {
        this.onAnnouce = true;
      } else this.onAnnouce = false;
      this.dataSourceSvcSchedule = new MatTableDataSource(this.scheduleList);
      this.dataSourceSvcSchedule.paginator = this.paginatorSchedule;
      this.sortSchedule();
    }
    );
  }

  getMySchedule() {
    this.isShowMyCustomer = true;
    if (this.fromDate == undefined) this.fromDate = null;
    if (this.toDate == undefined) this.toDate = null;
    this.scheduleService.getScheduleByToken(this.fromDate, this.toDate).subscribe(data => {
      this.mySchedule = data;
      // console.log('3 lich cua toi ',data);
      this.dataSourceSvcSchedule = new MatTableDataSource(this.mySchedule);
      this.dataSourceSvcSchedule.paginator = this.paginatorSchedule;
      this.sortSchedule();
    })
  }
  getMyReminder() {
    this.isShowMyCustomer = true;
    this.employeeId = +JSON.parse(localStorage.getItem('access_user')).EmployeeId;
    this.scheduleReminderService.getCustomerReminderByEmployeeId(this.employeeId).subscribe(res => {
      // console.log('Lich cua toi: ', res);
      this.myReminder = res;
      this.dataSourceReminder = new MatTableDataSource(this.myReminder);
      this.dataSourceReminder.paginator = this.paginatorReminder;


    });
  }

  getAllReminder() {
    this.isShowMyCustomer = false;
    this.scheduleReminderService.getReminderByDate(this.fromDate, this.toDate).subscribe(res => {
      this.scheduleReminderList = res;
      this.dataSourceReminder = new MatTableDataSource(this.scheduleReminderList);
      this.dataSourceReminder.paginator = this.paginatorReminder;

    });
  }

  sortSchedule() {
    if (this.isShowMyCustomer == false) {
      if (this.sortScheduleType == 1) {
        this.operationSchedules = this.scheduleList.filter(i => i.Type == 1);
        this.dataSourceSvcSchedule = new MatTableDataSource(this.operationSchedules);
        setTimeout(() => {
          this.dataSourceSvcSchedule.paginator = this.paginatorSchedule;
        }, 50)
      }
      if (this.sortScheduleType == 2) {
        this.examinationSchedules = this.scheduleList.filter(i => i.Type == 2);
        this.dataSourceSvcSchedule = new MatTableDataSource(this.examinationSchedules);
        setTimeout(() => {
          this.dataSourceSvcSchedule.paginator = this.paginatorSchedule;
        }, 50)
      }
      if (this.sortScheduleType == 3) {
        this.bandageChangingSchedules = this.scheduleList.filter(i => i.Type == 3);
        this.dataSourceSvcSchedule = new MatTableDataSource(this.bandageChangingSchedules);
        setTimeout(() => {
          this.dataSourceSvcSchedule.paginator = this.paginatorSchedule;
        }, 50)
      }
      if (this.sortScheduleType == 0) {
        this.getAllReminder();
      }
    }

    if (this.isShowMyCustomer == true) {
      if (this.sortScheduleType == 1) {
        this.operationSchedules = this.mySchedule.filter(i => i.Type == 1);
        this.dataSourceSvcSchedule = new MatTableDataSource(this.operationSchedules);
        setTimeout(() => {
          this.dataSourceSvcSchedule.paginator = this.paginatorSchedule;
        }, 50)

      }
      if (this.sortScheduleType == 2) {
        this.examinationSchedules = this.mySchedule.filter(i => i.Type == 2);
        this.dataSourceSvcSchedule = new MatTableDataSource(this.examinationSchedules);
        setTimeout(() => {
          this.dataSourceSvcSchedule.paginator = this.paginatorSchedule;
        }, 50)

      }
      if (this.sortScheduleType == 3) {
        this.bandageChangingSchedules = this.mySchedule.filter(i => i.Type == 3);
        this.dataSourceSvcSchedule = new MatTableDataSource(this.bandageChangingSchedules);
        setTimeout(() => {
          this.dataSourceSvcSchedule.paginator = this.paginatorSchedule;
        }, 50)
      }
      else {
        this.getMyReminder();
      }
    }

  }

  getAllProvider() {
    this.employeeService.getAllProvider().subscribe(res => {
      this.providerList = res;
    })
  }

  searchSchedule() {
    if (this.doctorId == undefined) {
      this.doctorId = null;
    }
    if (this.fromDate == undefined) {
      this.fromDate = null;
    }
    if (this.toDate == undefined) {
      this.toDate = null;
    }
    this.scheduleService.searchSchedule(this.fromDate, this.toDate, this.doctorId, 1).subscribe(res => {
      this.searchData = res;
      if (this.sortScheduleType == undefined) {
        this.dataSourceSvcSchedule = this.searchData;
      }
      if (this.sortScheduleType == 1) {
        this.dataSourceSvcSchedule = this.searchData.filter(i => i.Type == 1);
      }
      if (this.sortScheduleType == 2) {
        this.dataSourceSvcSchedule = this.searchData.filter(i => i.Type == 2);

      }
      if (this.sortScheduleType == 3) {
        this.dataSourceSvcSchedule = this.searchData.filter(i => i.Type == 3);
      }
    })
  }
  clearSearchData() {
    this.doctorId = undefined;
    this.fromDate = undefined;
    this.toDate = undefined;
    this.sortSchedule();
  }


  openScheduleDetailForm(customerRemindersID: number) {
    this.dialog.open(ScheduleDetailComponent, {
      data: {
        customerRemindersID: customerRemindersID
      }
    }).afterClosed().subscribe(() => {
      if (this.isShowMyCustomer == true) {
        this.getMyReminder();
      }
      else {
        this.getAllReminder();
      }
    });
  }

  //3 lich
  openOperationScheduleDetail(schedule: any) {
    if (this.isShowMyCustomer == false) {
      if (schedule.Type == 2) {
        this.dialog.open(DetailMedicalScheduleComponent, {
          data: {
            operationSchedules: this.scheduleList.find(operationSchedule => operationSchedule.ScheduleId == schedule.ScheduleId)
          }
        }).afterClosed().subscribe(() => {
          this.getAllSchedules();
        });
      }
      else if (schedule.Type == 3) {
        this.dialog.open(DetailChangeBandageComponent, {
          data: {
            changeBandageDetail: this.scheduleList.find(changeBandageDetail => changeBandageDetail.ScheduleId == schedule.ScheduleId),
          }
        }).afterClosed().subscribe(() => {
          this.getAllSchedules();
        });
      }
    }

    else {
      if (schedule.Type == 2) {
        this.dialog.open(DetailMedicalScheduleComponent, {
          data: {
            operationSchedules: this.mySchedule.find(operationSchedule => operationSchedule.ScheduleId == schedule.ScheduleId)
          }
        }).afterClosed().subscribe(() => {
          this.getMySchedule();
        });
      }
      else if (schedule.Type == 3) {
        this.dialog.open(DetailChangeBandageComponent, {
          data: {
            changeBandageDetail: this.mySchedule.find(changeBandageDetail => changeBandageDetail.ScheduleId == schedule.ScheduleId),
          }
        }).afterClosed().subscribe(() => {
          this.getMySchedule();
        });
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSourceReminder.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceReminder.paginator) {
      this.dataSourceReminder.paginator.firstPage();
    }
  }


}
