import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MarketingService } from "../../services/marketing.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private alertService: AlertService,
    private marketingService: MarketingService,
  ) { }

  fileUploadedList: Array<Object>;
  totalPrice : number;
  dataSource: any;
  displayedColumns: string[] = [
    'Ngày',
    'Tên',
    'Số lượng KH',
    'Giá tiền',
    'Trạng thái'
  ];

  ngOnInit(): void {
    this.getListFileUploaded();
  }

  getListFileUploaded() {
    this.marketingService.getListFileUpload().subscribe(res => {
        this.fileUploadedList = res.reverse();
        this.dataSource = new MatTableDataSource(this.fileUploadedList);
        this.dataSource.paginator = this.paginator;
        this.totalPrice = this.fileUploadedList.map((file : any) => file.Price).reduce((acc : any, curr : any) => acc + curr, 0);
        // console.log(this.fileUploadedList, this.totalPrice);
    });
}

}
