import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//model
import { ChangeBandageModel } from "../../../../../../../../models/change-bandage.model";

//service
import { ProviderService } from "../../../../../../../../services/customer-provider.service";
import { ChangeBandageService } from "../../../../../../../../services/change-bandage.service";
import { AlertService } from "../../../../../../../../../../shared/services/alert.service";
@Component({
  selector: 'app-create-change-bandage',
  templateUrl: './create-change-bandage.component.html',
  styleUrls: ['./create-change-bandage.component.scss']
})
export class CreateChangeBandageComponent implements OnInit {

  constructor(
    private alerService: AlertService,
    private providerService: ProviderService,
    public dialogRef: MatDialogRef<CreateChangeBandageComponent>,
    private changeBandageSvc: ChangeBandageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  operationId: number;
  date: any = Date.now() + 86400 * 1000;
  time: string = '08:00';
  description: string;
  notes: string;
  providers: any;
  doctorList: object[];
  assisstantList: object[];
  status: any = '1';
  doctorId: number;
  assisstantId: number;

  ngOnInit(): void {
    setTimeout(() => {
      this.getAllProvider();
      this.getDate();
    }, 30);
  }

  getAllProvider() {
    this.providerService.list().subscribe(data => {
      console.log("provider",data);
      this.doctorList = data.filter(i => i.Type ==1);
      this.assisstantList = data.filter(i => i.Type == 2);
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

  createChangeBandage() {
    let bandageCalendar = new ChangeBandageModel();
    bandageCalendar.OperationId = this.data.operationId;
    bandageCalendar.ScheduleDate = this.date + 'T' + this.time;
    bandageCalendar.MainProviderIdList = [+this.doctorId];
    bandageCalendar.MainNurseIdList = [+this.assisstantId];
    bandageCalendar.Type = 3;
    bandageCalendar.Status = this.status;
    // bandageCalendar.ConditionDescription = this.conditionDescription;
    bandageCalendar.Notes = this.notes;
    console.log("check",bandageCalendar);
    this.changeBandageSvc.create(bandageCalendar
    ).subscribe(res => {
      this.alerService.changeMessage({
        text: 'Tạo lịch thay băng, cắt chỉ thành công',
        color: 'green'
      });
      this.closeDialog();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight) + "px";
  }

}
