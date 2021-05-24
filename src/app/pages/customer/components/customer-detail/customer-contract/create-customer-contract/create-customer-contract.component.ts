import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

//service
import { SurgeryService } from '../../../../services/surgery-service.service';
import { CustomerContractService } from '../../../../services/customer-contract.service';
import { CustomerService } from 'src/app/pages/customer/services/customer.service';

//model
import { CustomerContractModel } from "../../../../models/customer-contract.model";
import { AlertService } from '../../../../../../shared/services/alert.service';
import { PotentialLevelService } from 'src/app/pages/customer/services/potential-level.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerReminderService } from '../../../../services/customer-reminder.service';


@Component({
  selector: 'app-create-customer-contract',
  templateUrl: './create-customer-contract.component.html',
  styleUrls: ['./create-customer-contract.component.scss']
})
export class CreateCustomerContractComponent implements OnInit, OnDestroy {
  contractCode: string;
  contractContent: string;
  parentServiceList: any;
  childServiceList = [];
  surgeryServiceId: number;
  surgerySubServiceId: number;
  amount: any;
  signedDate: any = Date.now() + 86400 * 1000;
  customerId: number;
  contractImageString: any;
  selectedParentService = []; //list dich vu cha
  selectedChildService = []; //list dich vu con
  potentialLevelId: any = '2';
  level: any;
  listName = [];
  contractImageStringLst = [];
  @Output() messageEvent = new EventEmitter<any>();
  employeeId: number;
  reminderForm: FormGroup;

  constructor(
    private surgeryService: SurgeryService,
    private customerContractService: CustomerContractService,
    private alerService: AlertService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private potentialLevelService: PotentialLevelService,
    private fb: FormBuilder,
    private customerReminderService: CustomerReminderService,
  ) {
    this.reminderForm = this.fb.group({
      employeeId: [""],
      customerId: [""],
      type: [""],
      eventDate: [""],
      dayDate: [""],
      hourDate: [""]
    })
  }


  // status: number = 1;
  // disabledBtn: boolean = false;

  ngOnInit(): void {
    this.employeeId = +JSON.parse(localStorage.getItem('access_user')).EmployeeId;
    this.activatedRoute.paramMap.subscribe(params => this.customerId = +params.get('customerId'));
    this.getParentService();
    this.getDate();
    this.getPotentialLevel();
  }

  processFileContractImage(files: File) {
    var valueFile = Object.values(files);
    valueFile.forEach(file => {
      this.listName.push(file.name);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.contractImageString = reader.result;
        this.contractImageStringLst.push(this.contractImageString.split(",")[1]);
      }
    });


  }
  getDate() {
    let date = new Date(this.signedDate),
      month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    this.signedDate = [year, month, day].join('-');
  }
  getParentService() {
    this.surgeryService.list().subscribe(res => {
      this.parentServiceList = res;
      // console.log('DS dich vu cha: ', this.parentServiceList);
    });
  }

  // getChildService(parentServiceId: number) {
  //   this.surgeryService.getChildService(parentServiceId).subscribe(data => {
  //     this.childServiceList = JSON.parse(JSON.stringify(data)).Payload;
  //     console.log('DS dich vu con: ', this.childServiceList);
  //   });
  // }

  createContract() {
    let contract = new CustomerContractModel();
    contract.ContractCode = this.contractCode;
    contract.ContractContent = this.contractContent;
    contract.CustomerId = this.customerId;
    // contract.SurgeryServiceId = this.surgeryServiceId;
    // contract.SurgerySubServiceId = this.surgerySubServiceId;
    contract.SubServiceIdLst = this.selectedChildService;
    contract.Amount = +this.amount;
    contract.SignedDate = this.signedDate;
    if (this.contractImageString) contract.ContractImageURL = this.contractImageString.split(',')[1];
    contract.Status = 1;
    contract.Type = 1;
    contract.PotentialLevelId = +this.potentialLevelId;
    this.customerContractService.create(contract).subscribe(res => {
      if (this.reminderForm.value.dayDate) {
        this.createCustomerReminder();
      }

      this.alerService.changeMessage({
        color: 'green',
        text: `Tạo đơn hàng thành công`
      });
      this.sendMessage();
    });
    // this.router.([`/pages/customer/${this.customerId}`], { queryParams: { tab: 6 } });
  }

  cancelCreate() {
    this.sendMessage();
    // this.router.navigate([`/pages/customer/${this.customerId}`]);
    // setTimeout(() => this.router.navigate([`/pages/customer/${this.customerId}`], { queryParams: { tab: 6 } }), 30);
  }

  //Gửi data đến component cha (customer-contract-detail)
  sendMessage() {
    this.messageEvent.emit(0);
  }

  ngOnDestroy() {
    this.messageEvent.unsubscribe();
  }
  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight) + "px";
  }

  formatAmount() {
    if (this.amount.includes(',')) {
      this.amount = +this.amount.split(',').join('');
      this.amount = new Intl.NumberFormat().format(this.amount);
    }
    else if (this.amount.includes(',')) {
      this.amount = +this.amount.split(',').join('');
      this.amount = new Intl.NumberFormat().format(this.amount);
    }
    else if (this.amount == 0) {
      this.amount = "";
    }
    else if (isNaN(this.amount)) {
      this.amount = "";
    }
    else {
      this.amount = new Intl.NumberFormat().format(this.amount);
    }
  }

  chooseParentService(event: any) {
    if (!event) {
      this.childServiceList = [];
      this.selectedParentService.forEach(parentServiceId => {
        this.surgeryService.getChildService(parentServiceId).subscribe(data => {
          this.childServiceList.push(...data);
        });
      });
    }
    // console.log('DS dich vu con: ', this.childServiceList);
  }

  // getLevelValue() {
  //   this.customerService.getLevelValue().subscribe(res => {
  //     res.pop();
  //     this.level = res;
  //     console.log('L đơn hàng', this.level);
  //   });
  // }

  getPotentialLevel() {
    this.potentialLevelService.list().subscribe(data => {
      this.level = data;

    });
  }

  createCustomerReminder() {
    this.reminderForm.patchValue({
      employeeId: this.employeeId,
      customerId: this.customerId,
      eventDate: this.reminderForm.get('dayDate').value + 'T' + this.reminderForm.get('hourDate').value,
    });
    this.customerReminderService.create(this.reminderForm.value).subscribe(res => {
    });
  }

}
