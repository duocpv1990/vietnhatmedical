import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//service
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { map, switchMap } from 'rxjs/operators';
import { DataService } from "../../../../shared/services/data.service";

import { CallCustomerComponent } from "./dialog/call-customer/call-customer.component";
import { BaseComponent } from "../../../../shared/components/base.component";
import { CustomerModel } from '../../models/customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})

export class CustomerDetailComponent extends BaseComponent implements OnInit, AfterViewInit {

  @Input() selectedIndex: number | null
  @ViewChild('service', { read: ViewContainerRef }) service: ViewContainerRef;
  @ViewChild('consultantNote', { read: ViewContainerRef }) consultantNote: ViewContainerRef;
  @ViewChild('exam', { read: ViewContainerRef }) exam: ViewContainerRef;
  // @ViewChild('history', { read: ViewContainerRef }) history: ViewContainerRef;
  @ViewChild('callLogs', { read: ViewContainerRef }) callLogs: ViewContainerRef;
  @ViewChild('contract', { read: ViewContainerRef }) contract: ViewContainerRef;
  @ViewChild('personInCharge', { read: ViewContainerRef }) personInCharge: ViewContainerRef;
  @ViewChild('contractImg', { read: ViewContainerRef }) contractImg: ViewContainerRef;

  constructor(
    private cfr: ComponentFactoryResolver,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private dataService: DataService,
    public router: Router,
    private dialog: MatDialog,
  ) {
    super(router); this.checkToken();
    this.isAccess = this.checkAccess('api/customer,GET');
    this.isExam = this.checkAccess('api/customerexam,GET');
    this.isService = this.checkAccess('api/operation/customer,GET');

    this.isConsultantNote = this.checkAccess('api/customerconsultation,GET');
    this.isScheduleBooking = this.checkAccess('api/customerreminder,POST');
    this.isContract = this.checkAccess('api/contract,GET');
    this.isPersonInCharge = this.checkAccess('api/employee/customer,get');
    this.isContractImage = this.checkAccess('api/contractimage/customer,GET');
    this.isCallLog = this.checkAccess('api/call/customer,GET');
  }

  customer = new CustomerModel();
  isAccess: any;
  isExam: any;
  isService: any;
  isContract: any;
  isInfo: any;
  isConsultantNote: any;
  isScheduleBooking: any;
  isCallLog: any;
  isPersonInCharge: any;
  isContractImage: any;

  ngOnInit(): void {
    this.customer.CustomerID = +this.activatedRoute.snapshot.paramMap.get('customerId');
    this.getCurrentCustomer();

  }

  ngAfterViewInit() {
    setTimeout(() => this.checkActiveTab());
  }


  getCurrentCustomer() {
    this.customerService.getCustomerById(this.customer.CustomerID).subscribe(data => {
      this.customer = data;
    });
  }

  checkActiveTab() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.selectedIndex = +params.get('tab');
      this.selectedIndex === 2 && this.loadCustomerService();
      // this.selectedIndex === 3 && this.loadCustomerHistory();
      this.selectedIndex === 1 && this.loadCustomerCallLogs();
      this.selectedIndex === 4 && this.loadCustomerConsultantNote();
      this.selectedIndex === 5 && this.loadCustomerExam();
      this.selectedIndex === 6 && this.loadCustomerContract();
      this.selectedIndex === 7 && this.loadPersonInCharge();
    });
  }

  async loadCustomerService() {
    this.service.clear();
    const { CustomerServiceComponent } = await import('./customer-service/customer-service.component');
    this.service.createComponent(
      this.cfr.resolveComponentFactory(CustomerServiceComponent)
    );
  }

  async loadCustomerConsultantNote() {
    this.consultantNote.clear();
    const { CustomerConsultantNoteComponent } = await import('./customer-consultant-note/customer-consultant-note.component');
    this.consultantNote.createComponent(
      this.cfr.resolveComponentFactory(CustomerConsultantNoteComponent)
    );
    this.dataService.changeMessage(0);
  }

  async loadCustomerExam() {
    this.exam.clear();
    const { CustomerExamComponent } = await import('./customer-exam/customer-exam.component');
    this.exam.createComponent(
      this.cfr.resolveComponentFactory(CustomerExamComponent)
    );
  }

  async loadCustomerContract() {
    // this.contract.clear();
    // const { CustomerContractComponent } = await import('./customer-contract/customer-contract.component');
    // this.contract.createComponent(
    //   this.cfr.resolveComponentFactory(CustomerContractComponent)
    // );
    setTimeout(() => this.dataService.changeMessage(0), 50);
  }

  // async loadCustomerHistory() {
  //   this.history.clear();
  //   const { CustomerHistoryComponent } = await import('./customer-history/customer-history.component');
  //   this.history.createComponent(
  //     this.cfr.resolveComponentFactory(CustomerHistoryComponent)
  //   );
  // }

  async loadCustomerCallLogs() {
    this.callLogs.clear();
    const { CallLogsComponent } = await import('./call-logs/call-logs.component');
    this.callLogs.createComponent(
      this.cfr.resolveComponentFactory(CallLogsComponent)
    );
  }

  async loadPersonInCharge() {
    this.personInCharge.clear();
    const { PersonInChargeComponent } = await import('./person-in-charge/person-in-charge.component');
    this.personInCharge.createComponent(
      this.cfr.resolveComponentFactory(PersonInChargeComponent)
    );
  }
  async loadContractImages() {
    this.contractImg.clear();
    const { CustomerContractImagesComponent } = await import('./customer-contract-images/customer-contract-images.component');
    this.contractImg.createComponent(
      this.cfr.resolveComponentFactory(CustomerContractImagesComponent)
    );
  }

  callCustomer() {
    localStorage.setItem('customer-phone-number', this.customer.Phone);
    setTimeout(() => this.dialog.open(CallCustomerComponent, {
      disableClose: true,
      data: {
        customerId: this.customer.CustomerID
      }
    }).afterClosed().subscribe(() => {
      localStorage.removeItem('isCalled');
    }), 100);
  }


}
