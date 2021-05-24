import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, } from '@angular/material/paginator';
import {  MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";

//component
import { CreateChangeBandageComponent } from "./dialog/create-change-bandage/create-change-bandage.component";
import { DetailChangeBandageComponent } from "./dialog/detail-change-bandage/detail-change-bandage.component";

//module
import { ActivatedRoute } from '@angular/router';


//service
import { OperationService } from "../../../../../../services/operation.service";
import { ChangeBandageService } from "../../../../../../services/change-bandage.service";
import { CustomerService } from "../../../../../../services/customer.service";
@Component({
  selector: 'app-change-bandage',
  templateUrl: './change-bandage.component.html',
  styleUrls: ['./change-bandage.component.scss']
})
export class ChangeBandageComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @Input('currentService') currentService: any;

  constructor(
    private dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    public customerService: CustomerService,
    public changeBandageService: ChangeBandageService
  ) { }
  operationId: number;
  operations: any;
  customerId: number;
  customer: any;
  dataSource: any;
  changeBandage: any;
  onShow : any;
  displayedColumns =[
    'Ngày',
    'Giờ',
    'Bác sĩ',
  ];
  
  ngOnInit(): void {
    this.getChangeBandage();
  }

  getChangeBandage(){
    this.changeBandageService.getListChangeBandage(this.currentService.OperationId).subscribe(data =>{
      console.log(data);
      
      this.changeBandage = data.filter(i => i.Type == 3).reverse();;
      console.log('list changeBandage',this.changeBandage);
      this.dataSource = new MatTableDataSource(this.changeBandage);
      this.dataSource.paginator = this.paginator;
      if(this.changeBandage.length == 0){
        this.onShow = 'Chưa có Lịch';
      }
      else{
        this.onShow = '';
      }
    });
  }

  openCreateForm() {
    this.dialog.open(CreateChangeBandageComponent,{
      data: {
        operationId: this.currentService.OperationId,
      }
    }).afterClosed().subscribe(() => {
      this.getChangeBandage();
    });
  }

  openDetailForm(operationScheduleId : number) {
    this.dialog.open(DetailChangeBandageComponent,{
      data: {
        changeBandageDetail: this.changeBandage.find(changeBandageDetail => changeBandageDetail.OperationScheduleId == operationScheduleId),
      }
    }).afterClosed().subscribe(() => {
      this.getChangeBandage();
    });
  }

}
