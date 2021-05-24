import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

//service
import { MedicalScheduleService } from '../../../../../../services/customer-medical-schedule.service';

//dialog component
import { CreateMedicalScheduleComponent } from './dialog/create-medical-schedule/create-medical-schedule.component';
import { DetailMedicalScheduleComponent } from './dialog/detail-medical-schedule/detail-medical-schedule.component'

@Component({
  selector: 'app-medical-schedule',
  templateUrl: './medical-schedule.component.html',
  styleUrls: ['./medical-schedule.component.scss']
})
export class MedicalScheduleComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @Input('currentService') currentService: any;

  constructor(private medicalScheduleService: MedicalScheduleService,
    public dialog: MatDialog) { }

  displayedData: any;
  operationId: number;
  onShow;
  operationSchedulesList: any;
  displayedColumns = [
    'Ngày',
    'Giờ',
    'Bác sĩ'
  ];

  backendDisplayColumns = [
    'DateString',
    'TimeString',
    'MainProviderString',
  ];

  ngOnInit(): void {
    this.getAllOperationSchedule();
  }

  getAllOperationSchedule() {
    this.operationId = this.currentService.OperationId;
    this.medicalScheduleService.getOperationSchedule(this.operationId).subscribe(data => {
      this.operationSchedulesList = JSON.parse(JSON.stringify(data)).Payload.filter(i => i.Type == 2).reverse();
      this.displayedData = new MatTableDataSource(JSON.parse(JSON.stringify(this.operationSchedulesList)));
      this.displayedData.paginator = this.paginator;
      console.log('Lịch khám/tái khám', this.operationSchedulesList);
      if (this.operationSchedulesList.length == 0) {
        this.onShow = 'Chưa có Lịch';
      }
      else {
        this.onShow = '';
      }
    });
  }

  openCreateMedicalScheduleDialog() {
    this.dialog.open(CreateMedicalScheduleComponent, {
      data: {
        operationId: this.operationId
      }
    }).afterClosed().subscribe(() => {
      this.getAllOperationSchedule();
    });
  }

  openDetailMedicalScheduleDialog(operationScheduleId) {
    this.dialog.open(DetailMedicalScheduleComponent, {
      data: {
        operationSchedules: this.operationSchedulesList.find(operationSchedule => operationSchedule.OperationScheduleId == operationScheduleId)
      }
    }).afterClosed().subscribe(() => {
      this.getAllOperationSchedule();
    });
  }

}
