import { Component, OnInit, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//service
import { CustomerContractService } from '../../../services/customer-contract.service'
import { async } from '@angular/core/testing';
import { DataService } from "../../../../../shared/services/data.service";

import { BaseComponent } from "../../../../../shared/components/base.component";



@Component({
  selector: 'app-customer-contract',
  templateUrl: './customer-contract.component.html',
  styleUrls: ['./customer-contract.component.scss']
})
export class CustomerContractComponent extends BaseComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  isAccess: any;
  isAccessAdd: any;
  customerId: number;
  contractList: any;
  isShow: number = 0;
  dataSource: any;
  displayedColumns: string[] = [
    'ContractCode',
    'Date',
    'Services',
    'Value',
    'Status'
  ];

  constructor(
    public customerContractService: CustomerContractService,
    public activatedRoute: ActivatedRoute,
    private dataService: DataService,
    public router: Router,

  ) {
    super(router); this.checkToken();
    this.isAccess = this.checkAccess('api/contract,GET');
    this.isAccessAdd = this.checkAccess('api/contract,POST');

  }



  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.customerId = +params.get('customerId'));
    this.dataService.currentMessage.subscribe(res => {
      this.isShow = res;
      this.getContractByCustomerId();
    });
    this.getContractByCustomerId();


  }

  getContractByCustomerId() {
    this.customerContractService.getContractByCustomerId(this.customerId).subscribe(data => {
      // console.log('DS hop dong', data);
      this.contractList = data;
      this.contractList = this.contractList.reverse();
      this.dataSource = new MatTableDataSource(this.contractList);
      this.dataSource.paginator = this.paginator;
    });
  }

  showCreateContractForm() {
    this.isShow = 1;
  }

  //Nhận được data từ component con (create-customer-contract)
  receiveMessage(event: number) {
    this.isShow = event;
    this.getContractByCustomerId();
  }

  // showContract(contractId: any) {
  //   this.contractDetail = this.contractList.find(contract => contract.ContractId == contractId);
  //   this.isShow = 2;
  // }

  public showContractDetail(contract: any) {
    localStorage.setItem('customer-contract', JSON.stringify(contract));
    this.isShow = 2;
  }



}
