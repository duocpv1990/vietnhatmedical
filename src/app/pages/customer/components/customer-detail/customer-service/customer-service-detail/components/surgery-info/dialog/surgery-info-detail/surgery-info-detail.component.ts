import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from "@angular/router";

//service
import { AlertService } from 'src/app/shared/services/alert.service';
import { OperationService } from "../../../../../../../../services/operation.service";
import { ProviderService } from "../../../../../../../../../employee/services/provider.service";

//model
import { OperationModel } from "../../../../../../../../models/operation.model";

@Component({
  selector: 'app-surgery-info-detail',
  templateUrl: './surgery-info-detail.component.html',
  styleUrls: ['./surgery-info-detail.component.scss']
})
export class SurgeryInfoDetailComponent implements OnInit {
  rating: number;
  constructor(
    public dialogRef: MatDialogRef<SurgeryInfoDetailComponent>,
    private alerService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private operationService: OperationService,
    private router: Router,
    private providerService: ProviderService,

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
  completedTime: string;
  completedDate: string;
  ngOnInit(): void {
    console.log('Thong tin phau thuat: ', this.data.surgeryInfo);
    setTimeout(() => {
      this.getProviderList();
      this.getProviderOfOperation();
      this.getSurgeryInfo();
    }, 100);
  }

  getSurgeryInfo() {
    this.notes = this.data.surgeryInfo.Notes;
    if (this.data.surgeryInfo.Rating !== null) {
      this.rating = this.data.surgeryInfo.Rating;
    }
    if (this.data.surgeryInfo.OperationDate !== null) {
      this.operationDate = this.formatStr('T', 0, this.data.surgeryInfo.OperationDate);
      this.operationTime = this.data.surgeryInfo.OperationDate.split('T')[1];
    } else this.operationDate = '';

    if (this.data.surgeryInfo.CompletedDate !== null) {
      this.completedDate = this.formatStr('T', 0, this.data.surgeryInfo.CompletedDate);
      this.completedTime = this.data.surgeryInfo.CompletedDate.split('T')[1];
    } else this.completedDate = '';

    if (this.data.surgeryInfo.AdmissionDate !== null) {
      this.admissionDate = this.formatStr('T', 0, this.data.surgeryInfo.AdmissionDate);
    } else this.admissionDate = '';

    if (this.data.surgeryInfo.DischargeDate !== null) {
      this.dischargeDate = this.formatStr('T', 0, this.data.surgeryInfo.DischargeDate);
    } else this.dischargeDate = '';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight) + "px";
  }

  getProviderList() {
    this.providerService.list().subscribe(data => {

      this.doctorList = data.filter(i => i.Type == 1);
      this.assistantList = data.filter(i => i.Type == 2);
    });
  }

  getProviderOfOperation() {
    this.operationService.getProviderByOperationId(this.data.surgeryInfo.OperationId).subscribe(data => {
      this.providerByOperation = data;
      this.providerByOperation.forEach(i => {
        if (i.Type == 1) {
          this.mainDoctorIDList.push(i.ProviderID);
          this.selectedMainDoctor = this.mainDoctorIDList;
        }
        if (i.Type == 2) {
          this.mainNurseIdList.push(i.ProviderID);
          this.selectedMainNurse = this.mainNurseIdList;
        }
        if (i.Type == 3) {
          this.assistantDoctorIDList.push(i.ProviderID);
          this.selectedAssistantDoctor = this.assistantDoctorIDList;
        }
        if (i.Type == 5) {
          this.assistantNurseIdList.push(i.ProviderID);
          this.selectedAssistantNurse = this.assistantNurseIdList;
        }
      });
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
    console.log(this.mainDoctorIDList);
  }

  chooseMainNurse(nurseId) {
    if (this.mainNurseIdList.includes(nurseId)) {
      let index = this.mainNurseIdList.findIndex(i => i == nurseId);
      this.mainNurseIdList.splice(index, 1);
    }
    else {
      this.mainNurseIdList.push(nurseId);
    }
    console.log(this.mainNurseIdList);
  }

  chooseAssistantDoctor(doctorId) {
    if (this.assistantDoctorIDList.includes(doctorId)) {
      let index = this.assistantDoctorIDList.findIndex(i => i == doctorId);
      this.assistantDoctorIDList.splice(index, 1);
    }
    else {
      this.assistantDoctorIDList.push(doctorId);
    }
    console.log(this.assistantDoctorIDList);
  }

  chooseAssistantNurse(nurseId) {
    if (this.assistantNurseIdList.includes(nurseId)) {
      let index = this.assistantNurseIdList.findIndex(i => i == nurseId);
      this.assistantNurseIdList.splice(index, 1);
    }
    else {
      this.assistantNurseIdList.push(nurseId);
    }
    console.log(this.assistantNurseIdList);
  }

  formatStr(typeSplit: string, position: number, str: string) {
    if (str !== undefined && str !== null) return str.split(typeSplit)[position];
  }

  chooseRating(rating: number) {
    this.rating = rating;
    console.log(this.rating);
  }


  updateSurgeryInfo() {
    let operation = new OperationModel();
    // operation.OperationDate = this.operationDate;
    operation.OperationDate = this.operationDate.split('T')[0] + `T${this.operationTime}:00`;
    operation.AdmissionDate = this.admissionDate;
    operation.DischargeDate = this.dischargeDate;
    operation.Notes = this.notes;
    operation.MainProviderIdList = this.mainDoctorIDList;
    operation.MainNurseIdList = this.mainNurseIdList;
    operation.AssistantNurseIdList = this.assistantNurseIdList;
    operation.AssistantProviderIdList = this.assistantDoctorIDList;
    operation.Rating = this.rating;
    operation.Status = 2;
    operation.CompletedDate = this.operationDate.split('T')[0] + `T${this.completedTime}:00`;
    console.log('operation gui di', operation);

    this.operationService.update(operation, this.data.surgeryInfo.OperationId).subscribe(() => {
      this.alerService.changeMessage({
        text: 'Cập nhật Thông tin phẫu thuật thành công',
        color: 'green'
      });
      this.closeDialog();
    });
  }

  deleteSurgeryInfo() {
    this.operationService.delete(this.data.surgeryInfo.OperationId).subscribe(() => {
      this.alerService.changeMessage({
        text: 'Xóa Thông tin phẫu thuật thành công',
        color: 'green'
      });
      this.closeDialog();
      this.router.navigate([`/pages/customer/${this.data.surgeryInfo.CustomerId}`]);
      setTimeout(() => this.router.navigate([`/pages/customer/${this.data.surgeryInfo.CustomerId}`], { queryParams: { tab: 2 } }), 30);
    });
  }

}
