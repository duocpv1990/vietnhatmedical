import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
//service
import { SurgeryService } from '../../../../services/surgery-service.service';
import { CustomerContractService } from '../../../../services/customer-contract.service';
import { CustomerContractPaymentService } from "../../../../services/customer-contract-payment.service";
import { PotentialLevelService } from "../../../../services/potential-level.service";

//model
import { CustomerContractModel } from "../../../../models/customer-contract.model";
import { AlertService } from '../../../../../../shared/services/alert.service';


//component
import { CreateContractPaymentComponent } from "../../dialog/create-contract-payment/create-contract-payment.component";
import { DeleteCustomerContractComponent } from "../../dialog/delete-customer-contract/delete-customer-contract.component";
import { ContractPaymentDetailComponent } from "../../dialog/contract-payment-detail/contract-payment-detail.component";
import { ContractImagesService } from 'src/app/pages/customer/services/customer-contract-images.service';
import { ContractImagesModel } from 'src/app/pages/customer/models/customer-contract-images.model';
import { ContractImagesDetailComponent } from "../../dialog/contract-images-detail/contract-images-detail.component";


@Component({
  selector: 'app-customer-contract-detail',
  templateUrl: './customer-contract-detail.component.html',
  styleUrls: ['./customer-contract-detail.component.scss']
})
export class CustomerContractDetailComponent implements OnInit {

  // @Input('contract') contract: any;

  constructor(
    private surgeryService: SurgeryService,
    private customerContractService: CustomerContractService,
    private alertService: AlertService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contractPaymentService: CustomerContractPaymentService,
    private potentialLevelService: PotentialLevelService,
    private currencyPipe: CurrencyPipe,
    private contractImg: ContractImagesService
  ) { }

  customerId: number;
  currentContract: any;
  contractCode: string;
  contractContent: string;
  parentServiceList: any;
  childServiceList = [];
  surgeryServiceId: any;
  surgerySubServiceId: any;
  amount: any;
  remain: number;
  signedDate: string;
  contractImageString: any;
  contractImgList: any;
  payment: any;
  paymentTotal: number;
  potentialLevelId: any;
  potentialLevelList: any;
  serviceListByContract: any;
  selectedParentService = []; //list dich vu cha
  selectedChildService = []; //list dich vu con
  serviceList: any;
  disabledBtn: boolean;
  status: number;
  formattedAmount: any;
  levelValue: number;
  listName = [];
  contractImageStringLst = [];
  model: any = {};
  imgList = [];
  imgListContractDetail: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.customerId = +params.get('customerId'));
    this.getPotentialLevel();
    this.getParentService();
    this.getContractDetail();
    this.getContractImages();
  }

  // processFileContractImage(files: File) {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = _event => {
  //     this.contractImageString = reader.result;
  //   };
  // }

  getParentService() {
    this.surgeryService.list().subscribe(res => {
      this.parentServiceList = res;
      // console.log('DS dich vu cha: ',this.parentServiceList);
    });
  }

  getChildService(parentServiceId: number) {
    this.surgeryService.getChildService(parentServiceId).subscribe(data => {
      this.childServiceList.push(...data);
      // console.log('DS dich vu con: ',this.childServiceList);
    });
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


  getContractImages() {
    let contract = JSON.parse(localStorage.getItem('customer-contract'));
    this.contractImg.getContractImageByCustomerId(this.customerId).subscribe(data => {
      this.model = data.find(x => x.ContractId == contract.ContractId);
      this.imgListContractDetail = this.model.MainImageObjectList.reverse();
    });
  }

  createContractImg() {
    let contract = JSON.parse(localStorage.getItem('customer-contract'));
    let data = new ContractImagesModel();
    data.ContractId = contract.ContractId;
    data.MainImageStringLst = this.contractImageStringLst;
    this.contractImg.createImgContract(data).subscribe(res => {
      this.listName.splice(0);
      this.contractImageStringLst.splice(0);
      this.ngOnInit();
    });
  }

  getContractDetail() {
    let contract = JSON.parse(localStorage.getItem('customer-contract'));
    this.customerContractService.getContractByCustomerId(this.customerId).subscribe(data => {
      this.currentContract = data;
      this.currentContract = this.currentContract.find(i => i.ContractId == contract.ContractId);

      this.contractCode = this.currentContract.ContractCode;
      if (this.currentContract.SignedDate !== null) {
        this.signedDate = this.currentContract.SignedDate.split('T')[0];
      } else {
        this.signedDate = '';
      }
      this.amount = this.currentContract.Amount;
      // this.formattedAmount = this.currencyPipe.transform(this.amount, 'VND');
      this.remain = this.currentContract.Remain;
      this.paymentTotal = this.currentContract.PaymentTotal;
      if (this.currentContract.PaymentTotal === null) this.paymentTotal = 0;
      this.contractContent = this.currentContract.ContractContent;
      // this.contractImageString = this.currentContract.MainImageObjectList ;
      this.potentialLevelId = this.currentContract.PotentialLevelId;
      localStorage.setItem('PotentialLevelId', this.potentialLevelId);
      this.levelValue = this.currentContract.PotentialLevelValue;
      this.status = this.currentContract.Status;
      // this.surgeryServiceId = this.currentContract.SurgeryServiceId;
      // this.surgerySubServiceId = this.currentContract.SurgerySubServiceId;
      // this.getChildService(this.surgeryServiceId);
      this.getServiceByContract();
      this.getPaymentByContractId();
      this.disabledBtn = this.potentialLevelId == 9 ? true : false;
    });
  }



  getPaymentByContractId() {
    this.contractPaymentService.getPaymentByContractId(this.currentContract.ContractId).subscribe(res => {
      this.payment = JSON.parse(JSON.stringify(res)).Payload.reverse();
      console.log('payment', this.payment);

    });
  }
  changePotentialId(id) {
    this.potentialLevelId = id;

  }

  updateCustomerContract() {
    var id = localStorage.getItem('PotentialLevelId');
    let contract = new CustomerContractModel();
    contract.SignedDate = this.signedDate;
    contract.Amount = +this.amount;
    contract.ContractContent = this.contractContent;
    if (this.potentialLevelId == id) {
      contract.PotentialLevelId = null;
    } else {
      contract.PotentialLevelId = this.potentialLevelId;
    }
    contract.SubServiceIdLst = this.selectedChildService;
    contract.Status = +this.status;

    this.createContractImg();

    this.customerContractService.update(contract, this.currentContract.ContractId).subscribe((res) => {
      this.getContractDetail();
      this.getContractImages();
    },
      (err) => {

      }, () => this.alertService.changeMessage({
        text: 'Cập nhật đơn hàng thành công',
        color: 'green'
      }));
  }

  openCreatePaymentForm() {
    this.dialog.open(CreateContractPaymentComponent, {
      disableClose: true,
      data: {
        contractId: this.currentContract.ContractId
      }
    }).afterClosed().subscribe(() => {
      this.getContractDetail();
      this.getPaymentByContractId();
    });
  }

  openDeleteContractForm() {
    this.dialog.open(DeleteCustomerContractComponent, {
      data: {
        contractId: this.currentContract.ContractId
      }
    }).afterClosed().subscribe(() => {
      this.router.navigateByUrl('/pages/customer/', this.currentContract.CustomerId);
      setTimeout(() => this.router.navigate([`/pages/customer/${this.currentContract.CustomerId}`], { queryParams: { tab: 6 } }), 30);
    });
  }

  openPaymentDetailForm(payment: any) {
    this.dialog.open(ContractPaymentDetailComponent, {
      disableClose: true,
      data: {
        contractPayment: payment
      }
    }).afterClosed().subscribe(() => {
      this.getContractDetail();
      this.getPaymentByContractId();
    });
  }

  openDetailForm(image: any) {
    this.dialog.open(ContractImagesDetailComponent, {
      disableClose: true,
      data: {
        ContractCode: this.model.ContractCode,
        ContractImageId: image.ContractImageId,
        ImageUrl: image.ImageUrl,
        CreatedOn: image.CreatedOn.split('T')[0]
      }
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }


  onInputValueChange(newValue: any): Number {
    this.amount = <Number>newValue;


    return this.amount

  }
  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight) + "px";
  }

  getPotentialLevel() {
    this.potentialLevelService.list().subscribe(data => {
      this.potentialLevelList = data;
    });
  }

  choosePotentialLevel(LevelValue: number) {
    this.levelValue = LevelValue;
    switch (LevelValue) {
      case 10:
        this.status = 3;
        break;
      case 9:
        this.status = 2;
        break;
      default:
        this.status = 1;
    }

  }

  getServiceByContract() {
    this.customerContractService.getServiceByContractId(this.currentContract.ContractId).subscribe(data => {
      // console.log('Dich vu cua hop dong: ', data);
      this.serviceList = data;
      this.selectedParentService.push(...data.map(i => i.SurgeryServiceId));
      this.selectedParentService = Array.from(new Set(this.selectedParentService)); //unique array
      this.selectedParentService.forEach(i => {
        this.getChildService(i);
      });
      this.selectedChildService.push(...data.map(i => i.SurgerySubServiceId));
    });
  }

  choosedParentService(event) {
    if (!event) { //after closed dropdown
      this.childServiceList = [];
      this.selectedParentService.forEach(parentServiceId => {
        this.surgeryService.getChildService(parentServiceId).subscribe(data => {
          this.childServiceList.push(...data);
        });
      });
      setTimeout(() => {
        let subIdList = this.childServiceList.map(subService => subService.SurgerySubServiceId);
        this.selectedChildService.forEach(i => {
          if (!subIdList.includes(i)) {
            let index = this.selectedChildService.findIndex(svc => svc == i);
            this.selectedChildService.splice(index, 1);
          }
        });
      }, 500);
    }
    // setTimeout(() => console.log('dich vu con', this.selectedChildService), 1500);
  }

  choosedChildService(event: any) {
    this.selectedChildService = event.value;
  }

  changeContractStatus(event: number) {
    if (event == 1) {
      this.disabledBtn = false;
      this.levelValue = this.currentContract.LevelValue;
    }
    else if (event == 2) {
      this.disabledBtn = true;
      this.levelValue = 9;
    }
    else if (event == 3) {
      this.disabledBtn = true;
      this.levelValue = 10;
    }

  }

  currencyInputChanged(value) {
    var num = value.replace(/[VND,]/g, "");
    return Number(num);
  }

}
