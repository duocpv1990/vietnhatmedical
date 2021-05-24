import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

//service
import { OperationService } from "../../../../../../services/operation.service";

//component
import { SurgeryInfoDetailComponent } from "./dialog/surgery-info-detail/surgery-info-detail.component";
import { SurgeryScheduleComponent } from "./dialog/surgery-schedule/surgery-schedule.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-surgery-info',
  templateUrl: './surgery-info.component.html',
  styleUrls: ['./surgery-info.component.scss']
})
export class SurgeryInfoComponent implements OnInit {
  rating: number;
  @Input('currentService') currentService: any;

  completedTimeString: string;


  constructor(
    private operationService: OperationService,
    private dialog: MatDialog,
    public router: Router,
  ) { }

  operation: any;
  admissionDateString: string;
  operationDateString: string;
  mainProviderListString: string;
  mainNurseString: string;
  notes: string;
  operationTimeString: string;
  serviceName: string;

  ngOnInit(): void {
    this.getSurgeryInfo();
  }

  getSurgeryInfo() {
    this.operationService.getOperationInfoByCustomerId(this.currentService.CustomerId).subscribe(data => {


      this.operation = data.find(ope => ope.OperationId == this.currentService.OperationId);
      console.log('thong tin phau thuat', this.operation);
      this.admissionDateString = this.operation.AdmissionDateString;
      this.operationDateString = this.operation.OperationDateString;
      this.completedTimeString = this.operation.CompletedTimeString;
      this.notes = this.operation.Notes;
      this.rating = this.operation.Rating;
      this.operationTimeString = this.operation.OperationTimeString;
      if (this.operation.MainProviderListString !== undefined) {
        this.mainProviderListString = this.formatStr('|', 0, this.operation.MainProviderListString);
      } else this.mainProviderListString = 'Chưa có';

      if (this.operation.MainNurseString !== undefined) {
        this.mainNurseString = this.formatStr('|', 0, this.operation.MainNurseString);
      } else this.mainNurseString = 'Chưa có';
    });
  }

  formatStr(typeSplit: string, position: number, str: string) {
    if (str !== undefined && str !== null) return str.split(typeSplit)[position];
  }

  openDetailForm() {
    this.dialog.open(SurgeryInfoDetailComponent, {
      data: {
        surgeryInfo: this.operation
      }
    }).afterClosed().subscribe(() => this.getSurgeryInfo());
  }

  openCreateScheduleForm() {
    this.dialog.open(SurgeryScheduleComponent, {
      data: {
        surgeryInfo: this.operation
      }
    }).afterClosed().subscribe(() => {
      this.getSurgeryInfo();

    });
  }


}
