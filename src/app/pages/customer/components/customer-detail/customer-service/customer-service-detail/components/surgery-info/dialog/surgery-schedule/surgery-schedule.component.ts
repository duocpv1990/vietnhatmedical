import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from "@angular/router";

//service
import { AlertService } from 'src/app/shared/services/alert.service';
import { OperationService } from "../../../../../../../../services/operation.service";
import { ProviderService } from "../../../../../../../../../employee/services/provider.service";
import { ScheduleService } from "../../../../../../../../../schedule/services/schedule.service";

//model
import { SurgerySchedule } from "../../../../../../../../models/surgery-schedule.model";
import { ScheduleModel } from "../../../../../../../../../schedule/models/schedule.model";

@Component({
  selector: 'app-surgery-schedule',
  templateUrl: './surgery-schedule.component.html',
  styleUrls: ['./surgery-schedule.component.scss']
})
export class SurgeryScheduleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SurgeryScheduleComponent>,
    private alerService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private operationService: OperationService,
    private router: Router,
    private providerService: ProviderService,
    private scheduleService: ScheduleService
  ) { }

  doctorList: any;
  assistantList: any;
  providerByOperation: any;
  operationDate: string; //ngày phẫu thuật
  operationTime: string; //giờ phẫu thuật
  admissionDate: string; //ngày nhập viện
  dischargeDate: string; //ngày xuất viện
  notes: string;
  selectedMainDoctor = []; //bac si chinh
  selectedAssistantDoctor = []; //bac si phu
  selectedMainNurse = []; //dieu duong chinh
  selectedAssistantNurse = []; //dieu duong phu
  mainDoctorIDList: number[] = [];
  assistantDoctorIDList: number[] = [];
  mainNurseIdList: number[] = [];
  assistantNurseIdList: number[] = [];

  ngOnInit(): void {
    console.log(this.data);
    
    setTimeout(() => {
      this.getProviderList();
    }, 30);
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getProviderList() {
    this.providerService.list().subscribe(data => {
      this.doctorList = data;
      this.assistantList = data;
    });
  }

  chooseMainDoctor(mainDoctorId) {
    if (this.mainDoctorIDList.includes(mainDoctorId)) {
      let index = this.mainDoctorIDList.findIndex(i => i == mainDoctorId);
      this.mainDoctorIDList.splice(index, 1);
    }
    else {
      this.mainDoctorIDList.push(mainDoctorId);
    }
  }

  chooseMainNurse(assitantId) {
    if (this.mainNurseIdList.includes(assitantId)) {
      // let index = this.mainNurseIdList.findIndex(i => i == assitantId);
      this.mainNurseIdList.splice(this.mainNurseIdList.indexOf(assitantId), 1);
    }
    else {
      this.mainNurseIdList.push(assitantId);
    }
  }

  chooseAssitantDoctor(assitantId) {
    if (this.assistantDoctorIDList.includes(assitantId)) {
      // let index = this.mainNurseIdList.findIndex(i => i == assitantId);
      this.assistantDoctorIDList.splice(this.assistantDoctorIDList.indexOf(assitantId), 1);
    }
    else {
      this.assistantDoctorIDList.push(assitantId);
    }

  }
  chooseAssistantNurseIdList(assitantId) {
    if (this.assistantNurseIdList.includes(assitantId)) {
      // let index = this.mainNurseIdList.findIndex(i => i == assitantId);
      this.assistantNurseIdList.splice(this.assistantNurseIdList.indexOf(assitantId), 1);
    }
    else {
      this.assistantNurseIdList.push(assitantId);
    }

  }

  createSurgerySchedule(){
    let surgerySchedule = new ScheduleModel();
    surgerySchedule.CustomerID = +this.data.surgeryInfo.CustomerId;
    surgerySchedule.OperationId = this.data.surgeryInfo.OperationId;
    if(this.operationDate) surgerySchedule.ScheduleDateTime = this.operationDate.split('T')[0] + `T${this.operationTime}:00`;
    surgerySchedule.Type = 1;
    surgerySchedule.IsSos = true;
    surgerySchedule.MainProviderIdList = this.mainDoctorIDList;
    surgerySchedule.MainNurseIdList = this.mainNurseIdList;
    surgerySchedule.AssistantNurseIdList = this.assistantNurseIdList;
    surgerySchedule.AssistantProviderIdList = this.assistantDoctorIDList;
    surgerySchedule.Notes = this.notes;
    console.log(surgerySchedule);
    this.scheduleService.create(surgerySchedule).subscribe(() => {
      this.alerService.changeMessage({
        text: 'Tạo lịch phẫu thuật thành công',
        color: 'green'
      });
      this.closeDialog();
    });
  }

}
