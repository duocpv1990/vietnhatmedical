import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

//service
import { CustomerContractService } from 'src/app/pages/customer/services/customer-contract.service';
import { OperationService } from 'src/app/pages/customer/services/operation.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

import {ProviderService} from '../../../../../employee/services/provider.service';

//model
import { OperationModel } from 'src/app/pages/customer/models/operation.model';

@Component({
  selector: 'app-create-customer-service',
  templateUrl: './create-customer-service.component.html',
  styleUrls: ['./create-customer-service.component.scss']
})
export class CreateCustomerServiceComponent implements OnInit, OnDestroy {
  @Output() messageEvent = new EventEmitter<any>();

  constructor(
    private customerContracService: CustomerContractService,
    private  operationService: OperationService,
    private alertService: AlertService,
    private router: Router,
    private providerService: ProviderService,
    private activatedRoute : ActivatedRoute
  ) { }

  surgerySubServiceName: string;
  surgeryServiceName: string;
  surgeryServiceId: any;
  surgerySubServiceID: any;
  customerId: any;
  priority: any = '2';
  contractId: any;
  operationDate: any = Date.now()+86400*1000;
  reason: any;
  notes: any;
  type: any;
  status: any;
  contracts: any;
  doctorList: any;
  assistantList: any;
  selectedMainDoctor = []; //bac si chinh
  selectedAssistantDoctor = []; //bac si phu
  selectedMainNurse = []; //dieu duong chinh
  selectedAssistantNurse = []; //dieu duong phu
  mainDoctorIDList: number[] = [];
  assistantDoctorIDList: number[] = [];
  mainNurseIdList: number[] = [];
  assistantNurseIdList: number[] = [];

  ngOnInit(): void {
    this.getContractNotConnectToOperation();
    this.getProviderList();
    this.getDate();
  }

  getProviderList() {
    this.providerService.list().subscribe(data => {
      this.doctorList = data;
      this.assistantList = data;
    });
  }

  getDate(){
    let date = new Date(this.operationDate),
     month = ''+ (date.getMonth()+1),
     day = '' + date.getDate(),
     year = date.getFullYear();
     if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    this.operationDate = [year, month, day].join('-');
  }

  getContractNotConnectToOperation() {
    this.activatedRoute.paramMap.subscribe(params => this.customerId = +params.get('customerId'));
    this.customerContracService.getContractNotConnectToOperation(this.customerId).subscribe(data => {
      this.contracts = data;
      if(data.length == 0){
        this.sendMessage();
        this.router.navigate([`/pages/customer/${this.customerId}`], { queryParams: { tab: 2 }});
        return setTimeout(() => {
          this.router.navigate([`/pages/customer/${this.customerId}`], { queryParams: { tab: 6 }});
          this.alertService.changeMessage({
            color: 'red',
            text: `Vui lòng tạo đơn hàng mới`
          });
        }, 30);
      } 
    });
  }

  chooseContract(id) {
    let selectedContract =  this.contracts.find(i => id == i.ContractId);
    this.surgeryServiceName = selectedContract.SurgeryServiceName;
    this.surgeryServiceId = selectedContract.SurgerySubServiceId;
    this.surgerySubServiceName = selectedContract.SurgerySubServiceName;
    this.surgerySubServiceID = selectedContract.SurgerySubServiceId;
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
  
  createOperation() {
    let model = new OperationModel();
    model.CustomerId = this.customerId;
    model.Priority = +this.priority;
    model.OperationDate = this.operationDate;
    model.Reason = this.reason;
    model.Notes = this.notes;
    model.ContractId = this.contractId;
    model.Type = 1;
    model.Status = 1;
    model.SurgeryServiceId = this.surgeryServiceId;
    model.SurgerySubServiceId = this.surgerySubServiceID;
    model.MainProviderIdList = this.mainDoctorIDList;
    model.MainNurseIdList = this.mainNurseIdList;
    model.AssistantNurseIdList = this.assistantNurseIdList;
    model.AssistantProviderIdList = this.assistantDoctorIDList
    this.operationService.create(model).subscribe(data => {
      this.alertService.changeMessage({
        color: 'green',
        text: `Tạo Dịch vụ thành công!`
      });
      this.sendMessage();
    })

  }

  sendMessage() {
    this.messageEvent.emit(false);
  }

  cancelCreate(){
    this.sendMessage();
    // this.router.navigate([`/pages/customer/${this.customerId}`], { queryParams: { tab: 2 } });
  }

  ngOnDestroy() {
    this.messageEvent.unsubscribe();
  }
  
  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight)+"px";
  }
  
}
