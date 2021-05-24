import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { ContractImagesService } from "../../../services/customer-contract-images.service";

import { CreateContractImagesComponent } from "../dialog/create-contract-images/create-contract-images.component";
import { ContractImagesDetailComponent } from "../dialog/contract-images-detail/contract-images-detail.component";


@Component({
  selector: 'app-customer-contract-images',
  templateUrl: './customer-contract-images.component.html',
  styleUrls: ['./customer-contract-images.component.scss']
})
export class CustomerContractImagesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private contractImagesService: ContractImagesService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  customerId: number;
  contractImageList: any;
  dataSource: any;
  displayedColumns: string[] = [
    'Tên ĐH',
    'Ảnh trước',
    'Ảnh sau',
    'thay băng cắt chỉ',
    'khám, tái khám'
  ];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.customerId = +params.get('customerId'));
    this.getContractImages();
  }

  getContractImages() {
    this.contractImagesService.getContractImageByCustomerId(this.customerId).subscribe(data => {
      this.contractImageList = data;
      this.dataSource = new MatTableDataSource(this.contractImageList);
      this.dataSource.paginator = this.paginator;
    });
  }

  openCreateForm() {
    this.matDialog.open(CreateContractImagesComponent, {
      disableClose: true,
      data: {
        customerId: this.customerId
      }
    }).afterClosed().subscribe(() => {
      this.getContractImages();
    });
  }

  openDetailForm(contractCode, image: any) {
    this.matDialog.open(ContractImagesDetailComponent, {
      disableClose: true,
      data: {
        ContractCode: contractCode,
        ContractImageId: image.ContractImageId,
        ImageUrl: image.ImageUrl,
        CreatedOn: image.CreatedOn.split('T')[0]
      }
    }).afterClosed().subscribe(() => {
      this.getContractImages();
    });
  }

}