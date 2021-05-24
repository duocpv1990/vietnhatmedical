import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CustomerContractService } from 'src/app/pages/customer/services/customer-contract.service';
import { DataService } from "../../../../../../../../shared/services/data.service";

import { CustomerContractComponent } from "../../../../customer-contract/customer-contract.component";

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss'],
  providers: [CustomerContractComponent]
})
export class PaymentInfoComponent implements OnInit {

  @Input('currentService') currentService : any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public customerContractService: CustomerContractService,
    private contractCom: CustomerContractComponent,
    private dataService: DataService
  ) {
  }

  contract: any;

  ngOnInit(): void {
    this.getContractByCurrentService();
  }

  getContractByCurrentService(){
    this.customerContractService.list().subscribe(data => {
      this.contract = data.find(contract => contract.ContractId == this.currentService.ContractId);
      console.log('hop dong',this.contract);
    });
  }

  redirectContractTab(){
    // localStorage.setItem('customer-contract', JSON.stringify(this.contract));
    this.router.navigate([`/pages/customer/${this.currentService.CustomerId}`], { queryParams: { tab: 2}});
    setTimeout(() => {
      this.router.navigate([`/pages/customer/${this.currentService.CustomerId}`], { queryParams: { tab: 6}});
    },30);
    setTimeout(() => {
      this.dataService.changeMessage(2);
      this.contractCom.showContractDetail(this.contract);
    },200)
  }

}
