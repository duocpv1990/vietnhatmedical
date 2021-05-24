import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

//Service
import { AdvisoryScheduleService } from "./../../../../../../services/advisory-schedule.service";

//Dialog component
import { DetailAdvisoryScheduleComponent } from "./dialog/detail-advisory-schedule/detail-advisory-schedule.component";
import { CreateAdvisoryScheduleComponent } from "./dialog/create-advisory-schedule/create-advisory-schedule.component";

@Component({
  selector: "app-advisory-schedule",
  templateUrl: "./advisory-schedule.component.html",
  styleUrls: ["./advisory-schedule.component.scss"],
})
export class AdvisoryScheduleComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @Input("currentService") currentService: any;

  constructor(
    private advisoryScheduleService: AdvisoryScheduleService,
    public dialog: MatDialog
  ) { }
  operationId: number;
  onShow;
  doctor: string;
  displayedData: any;
  operationSchedulesList: any;
  displayedColumns = ["Ngày", "Giờ", "Bác sĩ"];
  backendDisplayColumns = ["DateString", "TimeString", "MainProviderString"];

  ngOnInit(): void {
    this.getAllOperationSchedule();
  }

  getAllOperationSchedule() {
    this.operationId = this.currentService.OperationId;
    this.advisoryScheduleService
      .getOperationSchedule(this.operationId)
      .subscribe((data) => {
        this.operationSchedulesList = JSON.parse(JSON.stringify(data))
          .Payload.filter((i) => i.Type == 4)
          .reverse();
        this.displayedData = new MatTableDataSource(
          JSON.parse(JSON.stringify(this.operationSchedulesList))
        );
        this.displayedData.paginator = this.paginator;
        console.log("Lịch tư vấn", this.operationSchedulesList);
        if (this.operationSchedulesList.length == 0) {
          this.onShow = "Chưa có Lịch";
        } else {
          this.onShow = "";
        }
      });
  }

  openCreateAdvisoryScheduleDialog() {
    this.dialog
      .open(CreateAdvisoryScheduleComponent, {
        data: {
          operationId: this.operationId,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllOperationSchedule();
      });
  }

  openDetailAdvisoryScheduleDialog(operationScheduleId) {
    this.dialog
      .open(DetailAdvisoryScheduleComponent, {
        data: {
          operationSchedules: this.operationSchedulesList.find(
            (operationSchedule) =>
              operationSchedule.OperationScheduleId == operationScheduleId
          ),
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllOperationSchedule();
      });
  }
}
