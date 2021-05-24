import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//model
import { ChangeBandageModel } from "../../../../../../../../models/change-bandage.model";

//service
import { ProviderService } from "../../../../../../../../services/customer-provider.service";
import { ChangeBandageService } from "../../../../../../../../services/change-bandage.service";
import { AlertService } from "../../../../../../../../../../shared/services/alert.service";
import { OperationService } from 'src/app/pages/customer/services/operation.service';
import {ScheduleService} from '../../../../../../../../../schedule/services/schedule.service';
@Component({
  selector: 'app-detail-change-bandage',
  templateUrl: './detail-change-bandage.component.html',
  styleUrls: ['./detail-change-bandage.component.scss']
})
export class DetailChangeBandageComponent implements OnInit {

  constructor(
    private alerService: AlertService,
    private providerService: ProviderService,
    public dialogRef: MatDialogRef<DetailChangeBandageComponent>,
    private changeBandageSvc: ChangeBandageService,
    public scheduleService: ScheduleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  operationId: number;
  date: string;
  time: string;
  description: string;
  notes: string;
  providers: any;
  doctorList: object[];
  assisstantList: object[];
  status: any;
  doctorId: any;
  assisstantId: any;
  providerList: any;
  selectedDoctorId: any;
  selectedNurseId: any;
  examList: any;
  mainDoctor = [];
  nurse = [];
  rating: number;

  ngOnInit(): void {
    setTimeout(() => {
      this.getAllProvider();
      this.getDoctor();
    // this.date = this.data.changeBandageDetail.ScheduleDate.split('T')[0];
    // this.time = this.data.changeBandageDetail.ScheduleDate.split('T')[1];
    if (this.data.changeBandageDetail.ScheduleDateTime !== undefined) {
      this.date = this.data.changeBandageDetail.ScheduleDateTime.split('T')[0];
      this.time = this.data.changeBandageDetail.ScheduleDateTime.split('T')[1];
    } else {
      this.date = this.data.changeBandageDetail.ScheduleDate.split('T')[0];
      this.time = this.data.changeBandageDetail.ScheduleDate.split('T')[1];
    }
    this.notes = this.data.changeBandageDetail.Notes;
    this.status = this.data.changeBandageDetail.Status.toString();
    this.rating = this.data.changeBandageDetail.ResultRating;
    }, 30);
  }

  chooseRating(rating: number) {
    this.rating = rating;
    console.log(this.rating);
    
  }


  getDoctor() {
    console.log(this.data.changeBandageDetail.ScheduleId);
    this.scheduleService.getScheduleProviderList(this.data.changeBandageDetail.ScheduleId).subscribe(res =>{
      this.examList = res;
      this.examList.forEach(i => {
        if(i.Type == 1) {
          this.doctorId = i.ProviderId;
          this.mainDoctor.push(this.doctorId);
        }
        else {
          this.assisstantId = i.ProviderId;
          this.nurse.push = this.assisstantId;
        }
      })
    })
  }

  pushToDoctorList(doctorId) {
    this.mainDoctor = [];
    this.mainDoctor.push(doctorId);
  }

  pushToNureList(nurseId) {
    this.nurse = [];
    this.nurse.push(nurseId);
  }

  updateChangeBandage() {
    let changeBandage = new ChangeBandageModel();
    changeBandage.Status = +this.status;
    changeBandage.MainProviderIdList = this.mainDoctor;
    changeBandage.MainNurseIdList = this.nurse;
    changeBandage.OperationScheduleId = this.data.changeBandageDetail.OperationScheduleId;
    changeBandage.ScheduleDateTime = this.date + 'T' + this.time + ':00';
    changeBandage.Notes = this.notes;
    changeBandage.ResultRating = this.rating;
    console.log(changeBandage);
    this.changeBandageSvc.editChangeBandageSchedule(this.data.changeBandageDetail.ScheduleId, changeBandage).subscribe((res) => {
      console.log(res);
      this.alerService.changeMessage({
        text: 'Cập nhật lịch thành công',
        color: 'green'
      });
      this.closeDialog();
    });
  }

  deleteChangeBandage() {
    this.changeBandageSvc.delete(this.data.changeBandageDetail.OperationScheduleId).subscribe(() => {
      this.alerService.changeMessage({
        color: 'green',
        text: `Xóa lịch công`
      });
      this.closeDialog();
    });
  }

  getAllProvider() {
    this.providerService.list().subscribe(data => {
      this.doctorList = data.filter(x => x.Type == 1);
      this.assisstantList = data.filter(a => a.Type == 2);
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
