import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//service
import { CustomerConsultantNoteService } from "../../../services/customer-consultant-note.service";

//component
import { BaseComponent } from "../../../../../shared/components/base.component";
import { ConsultantNoteDetailComponent } from "../dialog/consultant-note-detail/consultant-note-detail.component";
import { CreateConsultantNoteComponent } from './create-consultant-note/create-consultant-note.component';

@Component({
  selector: 'app-customer-consultant-note',
  templateUrl: './customer-consultant-note.component.html',
  styleUrls: ['./customer-consultant-note.component.scss']
})
export class CustomerConsultantNoteComponent extends BaseComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private consultantNoteService: CustomerConsultantNoteService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    super(router); this.checkToken();
    this.isAccess = this.checkAccess('api/customerconsultation,GET');
    this.isAccessAdd = this.checkAccess('api/customerconsultation,POST');
  }

  isAccess: any;
  isAccessAdd: any;
  consultantNoteList: any;
  customerId: number;
  isShow: number = 0;
  // windowForm = this.openDetailForm();
  dataSource: any;
  displayedColumns: string[] = [
    'Ngày',
    'Mô tả',
    'Ảnh'
  ];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.customerId = +params.get('customerId'));
    this.getConsultantNote();
  }

  getConsultantNote() {
    this.consultantNoteService.getConsultantNote(this.customerId).subscribe(data => {
      this.consultantNoteList = JSON.parse(JSON.stringify(data)).Payload.reverse();
      // console.log('Phiếu tư vấn: ', this.consultantNoteList);
      this.dataSource = new MatTableDataSource(this.consultantNoteList);
      this.dataSource.paginator = this.paginator;
    });
  }

  openCreateForm() {
    this.isShow = 1;
  }

  //Nhận được data từ component con (create-customer-contract)
  receiveMessage(event: number) {
    this.isShow = event;
    this.getConsultantNote();
  }

  createAdviceSlip() {
    this.dialog.open(CreateConsultantNoteComponent, {
      disableClose: true,
      data: {
        customerId: this.customerId
      }
    }).afterClosed().subscribe(() => {
      this.getConsultantNote();
    }

    )
  }

  openDetailForm(consultantNoteId: number) {
    this.dialog.open(ConsultantNoteDetailComponent, {
      data: {
        disableClose: true,
        consultantNote: this.consultantNoteList.find(consultantNote => consultantNote.CustomerConsultationId == consultantNoteId),
      }
    }).afterClosed().subscribe(() => {
      this.getConsultantNote();
    });
  }

}
