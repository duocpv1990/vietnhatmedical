import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//model
import { CustomerConsultantNoteModel } from "../../../../models/customer-consultant-note.model";

//service
import { CustomerConsultantNoteService } from "../../../../services/customer-consultant-note.service";
import { AlertService } from "../../../../../../shared/services/alert.service";
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-create-consultant-note',
  templateUrl: './create-consultant-note.component.html',
  styleUrls: ['./create-consultant-note.component.scss']
})
export class CreateConsultantNoteComponent implements OnInit {
  profileImageString: any;
  imageString: any;
  description: string;
  imagesPick: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  imagesName: any[] = [];
  consultationDate: any = Date.now() + 86400 * 1000;

  constructor(
    public dialogRef: MatDialogRef<CreateConsultantNoteComponent>,
    private adviceSlipService: CustomerConsultantNoteService,
    private alerService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  getDate() {
    let date = new Date(this.consultationDate),
      month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    this.consultationDate = [year, month, day].join('-');
  }

  processFileImage(files) {
    const fileArr = Object.values(files);
    fileArr.forEach((val: any) => {
      const type = val.type.split('/');
      if (type[0] == 'image') {
        this.imagesName.push(val.name);
        const reader = new FileReader();
        reader.readAsDataURL(val);
        reader.onload = () => {
          this.imageString = reader.result;
          this.imagesPick.next(this.imagesPick.getValue().concat(this.imageString.split(',')[1].toString()));
        };
      }
    });
  }

  // processFileProfileImage(files: File) {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = _event => {
  //     this.profileImageString = reader.result;
  //   };
  // }


  createAdviceSlip() {
    let adviceSlip = new CustomerConsultantNoteModel();
    adviceSlip.CustomerId = this.data.customerId;
    adviceSlip.ImageDescription = this.description;
    // adviceSlip.ConsultationNoteImageURL = this.profileImageString.split(',')[1];
    adviceSlip.ConsultationDate = this.consultationDate;
    adviceSlip.ConsultationNoteImageURLList = this.imagesPick.getValue();
    this.adviceSlipService.create(adviceSlip).subscribe(res => {
      this.alerService.changeMessage({
        text: 'Tạo thành công',
        color: 'green'
      });
      this.closeDialog();
    })
  }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight) + "px";
  }

}

