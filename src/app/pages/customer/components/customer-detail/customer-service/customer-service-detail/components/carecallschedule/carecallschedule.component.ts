import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

import { CustomerReminderService } from '../../../../../../services/customer-reminder.service';

//Service
// import { AdvisoryScheduleService } from "./../../../../../../services/advisory-schedule.service";
//Dialog component
import { CreateCarecallscheduleComponent } from './dialog/create-carecallschedule/create-carecallschedule.component';
import { DetailCarecallscheduleComponent } from './dialog/detail-carecallschedule/detail-carecallschedule.component';
import { AdvisoryScheduleService } from 'src/app/pages/customer/services/advisory-schedule.service';


@Component({
  selector: 'app-carecallschedule',
  templateUrl: './carecallschedule.component.html',
  styleUrls: ['./carecallschedule.component.scss']
})
export class CarecallscheduleComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @Input("currentService") currentService: any;
  constructor(
    // private advisoryScheduleService: AdvisoryScheduleService,
    private customerReminderService: CustomerReminderService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
  ) { }

  careCallId: number;
  onShow;
  doctor: string;
  displayedData: any;
  careCallSchedulesList: any;
  rating: number;
  displayedColumns = ["Ngày", "Giờ", "Bác sĩ"];
  backendDisplayColumns = ["DateString", "TimeString", "MainProviderString"];
  customerId: number;
  reminder: any;

  ngOnInit(): void {
    this.customerId = +this.route.snapshot.paramMap.get('customerId');
    this.getReminder();

  }

  getReminder() {
    this.customerReminderService.getCustomerReminderById(this.customerId).subscribe(data => {
      this.reminder = data;
      this.displayedData = new MatTableDataSource(this.reminder);
      this.displayedData.paginator = this.paginator;
      if (this.reminder.length == 0) {
        this.onShow = "Chưa có Lịch";
      } else {
        this.onShow = "";
      }

    })
  }

  openCreateCareDialog() {
    this.dialog
      .open(CreateCarecallscheduleComponent, {
        data: {
          operationId: this.currentService.OperationId,
          customerId: this.customerId
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.getReminder();
      });
  }
  openDetailCreateCareDialog(careCallScheduleId) {
    this.dialog
      .open(DetailCarecallscheduleComponent, {
        data: {
          operationSchedules: this.careCallSchedulesList.find(
            (careCallSchedule) =>
              careCallSchedule.OperationScheduleId == careCallScheduleId
          ),
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.getReminder();
      });
  }
}
