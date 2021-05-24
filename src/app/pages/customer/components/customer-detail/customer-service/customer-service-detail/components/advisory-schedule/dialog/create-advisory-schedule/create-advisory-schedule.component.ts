import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdvisoryScheduleService } from "../../../../../../../../services/advisory-schedule.service";
import { AdvisoryScheduleModel } from "../../../../../../../../models/advisory-schedule.model";
import { AlertService } from "../../../../../../../../../../shared/services/alert.service";
import { ProviderService } from "../../../../../../../../services/provider.service";

@Component({
  selector: "app-create-advisory-schedule",
  templateUrl: "./create-advisory-schedule.component.html",
  styleUrls: ["./create-advisory-schedule.component.scss"],
})
export class CreateAdvisoryScheduleComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateAdvisoryScheduleComponent>,
    private advisoryScheduleService: AdvisoryScheduleService,
    public alertService: AlertService,
    public providerService: ProviderService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  status: any = '1';
  date: any = Date.now() + 86400 * 1000;
  time: string = '08:00';
  description: string;
  notes: string;
  providerId: number;
  providers: any;
  assisstantList: any;
  assisstantId: number;
  doctorList: object[];
  doctorId: number;
  ngOnInit(): void {
    setTimeout(() => {
      this.getAllProvider();
      this.getDate();
    }, 30);
  }
  getAllProvider() {
    this.providerService.getAllProvider().subscribe(data => {
      this.doctorList = data.filter(i => i.Type == 1);
      this.assisstantList = data.filter(i => i.Type == 2);
    });
  }

  createAdvisorySchedule() {
    let data = new AdvisoryScheduleModel();
    data.Type = 4;
    data.Status = this.status;
    data.OperationId = this.data.operationId;
    data.Notes = this.notes;
    data.ScheduleDate = this.date + 'T' + this.time;
    data.ExaminateDoctorIdList = [+this.doctorId];
    data.MainNurseIdList = [+this.assisstantId];
    console.log("data", data);
    this.advisoryScheduleService.createAdvisorySchedule(data).subscribe(res => {
      console.log('form gui di', data);
      setTimeout(() => {
        this.alertService.changeMessage({
          color: 'green',
          text: `Tạo lịch tư vấn thành công!`
        }
        );
      }, 300);
      this.dialogRef.close();
    });
  }

  getDate() {
    let date = new Date(this.date),
      month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    this.date = [year, month, day].join('-');
  }

  closeDialog() {
    this.dialogRef.close();
  }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight) + "px";
  }
}
