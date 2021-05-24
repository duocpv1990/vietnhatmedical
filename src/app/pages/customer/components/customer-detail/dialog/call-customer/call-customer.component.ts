import { Component, OnInit, OnDestroy, Inject, OnChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CustomerCallLogModel } from "../../../../models/call-log.model";

import { CustomerService } from "../../../../services/customer.service";
import { PotentialLevelService } from 'src/app/pages/customer/services/potential-level.service';
import { CustomerContractService } from 'src/app/pages/customer/services/customer-contract.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CallCenterService } from 'src/app/pages/customer/services/call-center.service';
import { OperationService } from '../../../../services/operation.service';
import { OperationModel } from '../../../../models/operation.model';
import { CustomerRemindersModel } from 'src/app/pages/customer/models/customer-reminder.model';
import { CustomerReminderService } from 'src/app/pages/customer/services/customer-reminder.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var stringee: any;
declare var StringeeSoftPhone: any;
@Component({
  selector: 'app-call-customer',
  templateUrl: './call-customer.component.html',
  styleUrls: ['./call-customer.component.scss']
})
export class CallCustomerComponent implements OnInit, OnDestroy {
  rating: number;
  isShow: boolean;
  userRole = JSON.parse(localStorage.getItem('access_user')).PositionName;
  surgeryServiceList: any;
  operationId: number;
  surgeryService: any;
  reminderForm: FormGroup;
  dayDate: string;
  hourDate: string;
  onMakeCall = 0;
  employeeId: number;
  customerId: number;
  contractId: number;
  noteContent: string;
  contractList: any;
  choosedContract: any;
  potentialLevelId: number;
  potentialLevelList: any;
  fromPhoneNumber: any = '84947774666';
  fromNumbers = [{ alias: 'Number-1', number: '+84947774666' }];
  callLogInfo: any;
  stringee_token: string;
  stringee_rest_token: string;

  constructor(
    private potentialLevelService: PotentialLevelService,
    private customerContractService: CustomerContractService,
    public dialogRef: MatDialogRef<CallCustomerComponent>,
    private alerService: AlertService,
    private callCenterService: CallCenterService,
    private customerService: CustomerService,
    private router: Router,
    private operationService: OperationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerReminderService: CustomerReminderService,
    private fb: FormBuilder
  ) {
    this.reminderForm = this.fb.group({
      employeeId: [""],
      customerId: [""],
      type: [""],
      eventDate: [""],
      dayDate: [""],
      hourDate: [""]
    });
    this.stringee_token = localStorage.getItem('stringee_token');
    this.stringee_rest_token = localStorage.getItem("stringee_restful_token");
    this.fromNumbers = [{ alias: 'Number-1', number: `${this.fromPhoneNumber}` }];
  }


  ngOnInit(): void {

    if (this.userRole.toLowerCase() == 'cskh') {
      this.isShow = true;
    } else this.isShow = false;
    this.operationId = this.data.operationId;
    console.log('operationId', this.operationId);
    this.employeeId = +JSON.parse(localStorage.getItem('access_user')).EmployeeId;
    this.callConfig();

    setTimeout(() => {
      this.callConnect();
      this.getContractByCustomerId();
      this.getPotentialLevel();
      this.getOperationServices();
      this.chooseSurgeryService(this.operationId);
    }, 500);

  }

  callConnect() {
    StringeeSoftPhone.connect(this.stringee_token);
    StringeeSoftPhone.config({ fromNumbers: this.fromNumbers });
  }

  hiddenPhone() {
    var config = {
      showMode: 'none',
    };
    StringeeSoftPhone.init(config);
  }



  callConfig() {
    new stringee();
    var access_token = 'YOUR_ACCESS_TOKEN';

    var config = {
      showMode: 'full',
      arrowLeft: 155,
      arrowDisplay: 'top',
      fromNumbers: this.fromNumbers,
      askCallTypeWhenMakeCall: false,
      appendToElement: null,
      makeAndReceiveCallInNewPopupWindow: false
    };
    StringeeSoftPhone.init(config);

    StringeeSoftPhone.on('displayModeChange', function (event) {

      if (event === 'min') {
        StringeeSoftPhone.config({ arrowLeft: 75 });
      } else if (event === 'full') {
        StringeeSoftPhone.config({ arrowLeft: 155 });
      }
    });

    StringeeSoftPhone.on('requestNewToken', function () {

      StringeeSoftPhone.connect(access_token);
    });

    StringeeSoftPhone.on('authen', function (res) {

    });

    StringeeSoftPhone.on('disconnect', function () {

    });

    StringeeSoftPhone.on('beforeMakeCall', function (call, callType) {

      return true;
    });

    StringeeSoftPhone.on('answerIncomingCallBtnClick', function () {

    });

    StringeeSoftPhone.on('makeOutgoingCallBtnClick', function (fromNumber, toNumber, callType) {
      localStorage.setItem('onMakeCall', '1');
    });

    StringeeSoftPhone.on('incomingCall', function (incomingcall) {

    });

    StringeeSoftPhone.on('endCallBtnClick', function () {

    });

    StringeeSoftPhone.on('callingScreenHide', function () {

    });

    StringeeSoftPhone.on('declineIncomingCallBtnClick', function () {

    });

    StringeeSoftPhone.on('incomingScreenHide', function () {

    });

    StringeeSoftPhone.on('customMessage', function (data) {

    });
  }

  ngOnDestroy() {
    this.removeDiv();
  }

  removeDiv() {
    let dialPad = document.getElementsByClassName("stringee_iframe_wrapper");
    if (dialPad.length > 0) {
      for (let i = 0; i <= dialPad.length; i++) {
        dialPad[i].remove();
      }
    }
  }

  createCallLog() {
    let call = new CustomerCallLogModel();
    call.EmployeeId = this.employeeId;
    call.CustomerId = this.data.customerId;
    call.NoteContent = this.noteContent;
    if (this.contractId !== 0) {
      call.ContractId = this.contractId;
      call.PotentialLevelId = this.potentialLevelId;
    } else {
      call.ContractId = null;
      call.PotentialLevelId = null;
    }
    if (this.isShow) {
      this.updateRating();
    }
    if (this.reminderForm.value.dayDate) {
      this.createCustomerReminder();
    }
    this.onMakeCall = +localStorage.getItem('onMakeCall')

    if (this.onMakeCall == 1) {
      let callId = JSON.parse(localStorage.getItem('callInfo')).callId;
      this.callCenterService.getCallLogList(this.stringee_rest_token).subscribe(
        (data) => {
          this.callLogInfo = data.find(callLog => callLog.id == callId);
          console.log('callLogInfo', this.callLogInfo);

          if (this.callLogInfo.answer_duration !== 0) {
            call.URL = `http://api.stringee.com/v1/call/play/${this.callLogInfo.id}?access_token=${this.stringee_rest_token}`;
          }
          call.Phone = this.callLogInfo.answer_duration;
          call.StartDate = this.callLogInfo.start_time_datetime.split(', ').join('T');
          call.EndDate = this.callLogInfo.stop_time_datetime.split(', ').join('T');


          this.customerService.createCallLog(call).subscribe(res => {

            this.alerService.changeMessage({
              text: 'Đã lưu lịch sử cuộc gọi',
              color: 'green'
            });
            localStorage.removeItem('callInfo');
            localStorage.removeItem('onMakeCall');
            this.dialogRef.close();
          });
        },

      );
    } else {
      this.customerService.createCallLog(call).subscribe(res => {

        this.alerService.changeMessage({
          text: 'Đã lưu lịch sử cuộc gọi',
          color: 'green'
        });
        localStorage.removeItem('callInfo');
        this.dialogRef.close();
      });
    }
  }

  getPotentialLevel() {
    this.potentialLevelService.list().subscribe(data => {
      this.potentialLevelList = data;
      this.potentialLevelList.map(i => i.fakeId = i.PotentialLevelId + 'a');
    });
  }

  getContractByCustomerId() {
    this.customerContractService.getContractByCustomerId(this.data.customerId).subscribe(data => {
      // console.log('DS hop dong', data);
      this.contractList = data;
    });
  }

  choosePotentialLevel(potentialLevel: number) {
    this.potentialLevelId = potentialLevel;
  }

  choosedCustomerContract(contractId: number) {
    if (contractId != 0) {
      this.choosedContract = undefined;
      setTimeout(() => {
        this.choosedContract = this.contractList.find(contract => contract.ContractId == contractId);
        this.potentialLevelId = this.choosedContract.PotentialLevelId;
      }, 100);

    }
    else this.choosedContract = undefined;
  }

  chooseRating(rating: number) {
    this.rating = rating;
    console.log(this.rating);
  }

  getOperationServices() {
    this.operationService.getOperationInfoByCustomerId(this.data.customerId).subscribe(res => {
      this.surgeryServiceList = res;
      console.log('DS dich vu:', this.surgeryServiceList);

    });
  }

  chooseSurgeryService(operationId: number) {
    this.operationId = operationId;
    this.operationService.getOperationInfoByCustomerId(this.data.customerId).subscribe(res => {
      this.surgeryServiceList = res;
      console.log('operationId', this.operationId);
      this.surgeryService = this.surgeryServiceList.find(element => element.OperationId === this.operationId);
      console.log('dich vu:', this.surgeryService);

    });
  }

  updateRating() {
    let operation = new OperationModel();
    operation.Rating = this.rating;
    this.operationService.update(operation, this.operationId).subscribe(() => {
      this.closeDialog();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }



  createCustomerReminder() {
    this.reminderForm.patchValue({
      employeeId: this.employeeId,
      customerId: this.data.customerId,
      eventDate: this.reminderForm.get('dayDate').value + 'T' + this.reminderForm.get('hourDate').value,
    });
    this.customerReminderService.create(this.reminderForm.value).subscribe(res => {
    });
  }

}
