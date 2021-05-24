import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

//Service
import { AlertService } from "../../../../../../../../../../shared/services/alert.service";
import { ProviderService } from "../../../../../../../../services/provider.service";
import { AdvisoryScheduleService } from "../../../../../../../../services/advisory-schedule.service";
import { ScheduleService } from "../../../../../../../../../schedule/services/schedule.service";

//Model
import { AdvisoryScheduleModel } from "../../../../../../../../models/advisory-schedule.model";

@Component({
  selector: "app-detail-advisory-schedule",
  templateUrl: "./detail-advisory-schedule.component.html",
  styleUrls: ["./detail-advisory-schedule.component.scss"],
})
export class DetailAdvisoryScheduleComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DetailAdvisoryScheduleComponent>,
    private advisoryScheduleService: AdvisoryScheduleService,
    public alertService: AlertService,
    public providerService: ProviderService,
    public scheduleService: ScheduleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  status: any;
  date: any;
  time: any;
  description: string;
  notes: string;
  providerId: number;
  providers: any;
  providerList: any;
  mainNurseId: any;
  assisstantList: any;
  examList: any;
  rating: number;
  ngOnInit(): void {
    console.log("selected operationSchedule", this.data.operationSchedules);
    setTimeout(() => {
      this.getAllProvider();
      this.getDoctor();

      this.status = this.data.operationSchedules.Status.toString();
      this.rating = this.data.operationSchedules.ResultRating;
      if (this.data.operationSchedules.ScheduleDateTime !== undefined) {
        this.date = this.data.operationSchedules.ScheduleDateTime.split("T")[0];
        this.time = this.data.operationSchedules.ScheduleDateTime.split("T")[1];
      } else {
        this.date = this.data.operationSchedules.ScheduleDate.split("T")[0];
        this.time = this.data.operationSchedules.ScheduleDate.split("T")[1];
      }
      if (this.data.operationSchedules.Notes == null) {
        this.notes = "";
      } else {
        this.notes = this.data.operationSchedules.Notes;
      }
      if (this.data.operationSchedules.MainProviderIdList !== null) {
        this.providerId = this.data.operationSchedules.MainProviderIdList[0];
      }
    }, 30);
  }

  chooseRating(rating: number) {
    this.rating = rating;
    console.log(this.rating);
  }

  getDoctor() {
    this.scheduleService
      .getScheduleProviderList(this.data.operationSchedules.ScheduleId)
      .subscribe((res) => {
        this.examList = res;
        this.examList.forEach((i) => {
          if (i.Type == 4) {
            this.providerId = i.ProviderId;
          } else {
            this.mainNurseId = i.ProviderId;
          }
        });
      });
  }

  getAllProvider() {
    this.providerService.getAllProvider().subscribe((res) => {
      this.providers = res.filter((x) => x.Type == 1);
      this.assisstantList = res.filter((i) => i.Type == 2);
    });
  }

  updateAdvisorySchedule() {
    let advisoryScheduleModel = new AdvisoryScheduleModel();
    advisoryScheduleModel.OperationScheduleId = this.data.operationSchedules.OperationScheduleId;
    advisoryScheduleModel.Status = +this.status;
    advisoryScheduleModel.ExaminateDoctorIdList = [+this.providerId];
    advisoryScheduleModel.MainNurseIdList = [+this.mainNurseId];
    advisoryScheduleModel.ResultRating = this.rating;
    // advisoryScheduleModel.ScheduleDate = this.date + 'T' + this.time + ':00';
    advisoryScheduleModel.ScheduleDateTime = this.date + "T" + this.time + ":00";
    advisoryScheduleModel.Notes = this.notes;
    console.log(advisoryScheduleModel);
    this.advisoryScheduleService
      .editOperationSchedule(
        this.data.operationSchedules.ScheduleId,
        advisoryScheduleModel
      )
      .subscribe((res) => {
        setTimeout(() => {
          this.alertService.changeMessage({
            text: "Cập nhật Lịch tư vấn thành công",
            color: "green",
          });
        }, 300);
        this.dialogRef.close();
      });
  }

  deleteAdvisorySchedule() {
    this.advisoryScheduleService
      .deleteOperationSchedule(this.data.operationSchedules.OperationScheduleId)
      .subscribe((res) => {
        console.log(res);
        setTimeout(() => {
          this.alertService.changeMessage({
            text: "Xóa Lịch tư vấn thành công",
            color: "green",
          });
        }, 300);
      });
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = e.target.scrollHeight + "px";
  }
}
