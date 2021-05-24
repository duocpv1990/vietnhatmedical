import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MarketingService } from "../../../services/marketing.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-file-upload-detail',
  templateUrl: './file-upload-detail.component.html',
  styleUrls: ['./file-upload-detail.component.scss']
})
export class FileUploadDetailComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private alertService: AlertService,
    private marketingService: MarketingService,
    private activatedRoute: ActivatedRoute
  ) { }

  fileUploadId: number;
  fileDetail: any;
  mktFileUploadCustomer: any;
  totalPrice : number;
  dataSource: any;
  displayedColumns: string[] = [
    'Họ & tên',
    'Số điện thoại',
    'Email',
    'Ghi chú'
  ];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.fileUploadId = +params.get('fileId'));
    this.getFileUploadDetail();
  }

  getFileUploadDetail(){
    this.marketingService.getFileUploadDetail(+this.fileUploadId).subscribe(res => {
      this.mktFileUploadCustomer = res;
      this.dataSource = new MatTableDataSource(this.mktFileUploadCustomer);
        this.dataSource.paginator = this.paginator;
      console.log('ds khach hang trong file', this.mktFileUploadCustomer);
    });

    this.marketingService.getListFileUpload().subscribe(res => {
      this.fileDetail = res.find((item: any) => item.MarketingFileUploadId == this.fileUploadId);
    });
  }

}
