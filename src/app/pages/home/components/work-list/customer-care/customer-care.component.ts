import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { ScheduleReminderService } from '../../../../schedule/services/schedule-reminder.service';
import { ScheduleService } from '../../../../schedule/services/schedule.service';
import { CallCustomerComponent } from '../../../../customer/components/customer-detail/dialog/call-customer/call-customer.component';
import { ScheduleDetailComponent } from 'src/app/pages/schedule/components/schedule-list/dialog/schedule-detail/schedule-detail.component';

@Component({
  selector: 'app-customer-care',
  templateUrl: './customer-care.component.html',
  styleUrls: ['./customer-care.component.scss']
})
export class CustomerCareComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginatorSchedule: MatPaginator;
  @ViewChild(MatPaginator) paginatorReminder: MatPaginator;
  @Input() scheduleType: number;
  @Input() selectedDay: string;

  reminderColumns = ['Mã KH', 'Họ tên', 'Điện thoại', 'Bác sĩ', 'Dịch vụ', 'Ngày thực hiện', 'Đánh giá', 'Gọi điện'];
  reminderData: any;

  // reminderColumns = ['Giờ', 'Mã KH', 'Họ tên', 'Điện thoại', 'Sale phụ trách', 'Loại lịch', 'Ghi chú', 'Trạng thái'];
  // reminderData: any;

  rating: number;
  showScheduleTable = true;
  showReminderTable = true;

  constructor(
    public scheduleReminderService: ScheduleReminderService,
    public scheduleService: ScheduleService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getReminder();
    // this.getAllSchedules();

  }

  ngOnChanges() {
    this.getReminder();
    // this.getAllSchedules();

  }

  getReminder() {
    this.scheduleReminderService.getReminderByDate(this.selectedDay, this.selectedDay).subscribe(data => {


      if (data.length === 0) {
        this.showReminderTable = false;
      }
      this.reminderData = new MatTableDataSource(data.reverse());
      this.reminderData.paginator = this.paginatorReminder;
    });
  }

  callCustomer(customerId, phone, operationId) {
    localStorage.setItem('customer-phone-number', phone);
    setTimeout(() => this.dialog.open(CallCustomerComponent, {
      data: {
        customerId: customerId,
        operationId: operationId
      }
    }).afterClosed().subscribe(() => localStorage.removeItem('isCalled')), 100);
  }

  openReminderDetail(customerRemindersID: number) {
    this.dialog.open(ScheduleDetailComponent, {
      data: {
        customerRemindersID: customerRemindersID
      }
    });
  }


}
