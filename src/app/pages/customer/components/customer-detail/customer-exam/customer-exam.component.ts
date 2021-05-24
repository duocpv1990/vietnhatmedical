import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//service
import { CustomerExamService } from "../../../services/customer-exam.service";

//component
import { CreateCustomerExamComponent } from "../dialog/create-customer-exam/create-customer-exam.component";
import { CustomerExamDetailComponent } from "../dialog/customer-exam-detail/customer-exam-detail.component";
import { BaseComponent } from "../../../../../shared/components/base.component";
import { ContractImagesDetailComponent } from '../dialog/contract-images-detail/contract-images-detail.component';
import { CustomerExamImageService } from '../../../services/customer-exam-image.service';

@Component({
  selector: 'app-customer-exam',
  templateUrl: './customer-exam.component.html',
  styleUrls: ['./customer-exam.component.scss']
})
export class CustomerExamComponent extends BaseComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private customerExamImageService: CustomerExamImageService,
    private customerExamService: CustomerExamService,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    public router: Router
  ) {
    super(router); this.checkToken();
    this.isAccess = this.checkAccess('api/customerexam,GET');
    this.isAccessAdd = this.checkAccess('api/customerexam,POST');
  }
  isAccess: any;
  isAccessAdd: any;
  examList: any;
  customerId: number;
  dataSource: any;
  urls = new Array<string>();
  displayedColumns = [
    'Ngày',
    'Mô tả',
    'Ảnh'
  ];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.customerId = +params.get('customerId'));
    this.getExamByCustomerId();
  }

  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }

    }
  }

  getExamByCustomerId() {
    this.customerExamService.getExamByCustomerId(this.customerId).subscribe(data => {
      this.examList = JSON.parse(JSON.stringify(data)).Payload.reverse();
      this.examList.forEach((val, index) => {
        this.getImageList(val.CustomerExamId, index);
      });
    });
  }

  getImageList(id, index) {
    this.customerExamImageService.getListImageExam(id).subscribe(res => {
      this.examList[index].ImageList = res.Payload;
    });

    this.dataSource = new MatTableDataSource(this.examList);
    this.dataSource.paginator = this.paginator;
  }


  openImageDialog(examId, image: any) {
    this.matDialog.open(ContractImagesDetailComponent, {
      disableClose: true,
      data: {
        examId,
        examImageId: image.CustomerExamResultImageId,
        ImageUrl: image.ImageUrl,
        CreatedOn: image.CreatedOn.split('T')[0]
      }
    }).afterClosed().subscribe(() => {
      this.getExamByCustomerId();
    });
  }

  openCreateForm() {
    this.dialog.open(CreateCustomerExamComponent, {
      disableClose: true,
      data: {
        customerId: this.customerId
      }
    }).afterClosed().subscribe(() => {
      this.getExamByCustomerId();
    });
  }

  openDetailForm(examId: number) {
    this.dialog.open(CustomerExamDetailComponent, {
      disableClose: true,
      data: {
        exam: this.examList.find(exam => exam.CustomerExamId == examId),
      }
    }).afterClosed().subscribe(() => {
      this.getExamByCustomerId();
    });
  }

}
