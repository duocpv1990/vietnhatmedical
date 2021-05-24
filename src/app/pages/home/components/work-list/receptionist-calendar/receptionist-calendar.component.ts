import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ScheduleReminderService } from '../../../../schedule/services/schedule-reminder.service';
import { ScheduleService } from '../../../../schedule/services/schedule.service';

@Component({
  selector: 'app-receptionist-calendar',
  templateUrl: './receptionist-calendar.component.html',
  styleUrls: ['./receptionist-calendar.component.scss']
})
export class ReceptionistCalendarComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginatorSchedule: MatPaginator;
  @ViewChild(MatPaginator) paginatorReminder: MatPaginator;
  @Input() scheduleType: number;
  @Input() selectedDay: string;

  scheduleColumns = ['Giờ', 'Mã KH', 'Họ tên', 'Điện thoại', 'Bác sĩ', 'Loại lịch', 'Ghi chú', 'Trạng thái'];
  scheduleData: any;

  reminderColumns = ['Giờ', 'Mã KH', 'Họ tên', 'Điện thoại', 'Sale phụ trách', 'Loại lịch', 'Ghi chú', 'Trạng thái'];
  reminderData: any;



  constructor(
    public scheduleReminderService: ScheduleReminderService,
    public scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {

    this.getAllReminder();
    this.getAllSchedules();
  }
  ngOnChanges() {
    this.getAllReminder();
    this.getAllSchedules();
  }


  getAllReminder() {
    this.scheduleReminderService.getReminderByDate(this.selectedDay, this.selectedDay).subscribe(res => {
      this.reminderData = new MatTableDataSource(res);
      this.reminderData.paginator = this.paginatorReminder;
    });
  }

  getAllSchedules() {
    this.scheduleService.searchSchedule(this.selectedDay, this.selectedDay, null, 1).subscribe(data => {
      this.scheduleData = new MatTableDataSource(data);
      this.scheduleData.paginator = this.paginatorSchedule;

    }
    );
  }



}
