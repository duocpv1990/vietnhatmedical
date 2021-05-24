import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//model
import { CustomerExamModel } from "../../../../models/customer-exam.model";

//service
import { CustomerExamService } from "../../../../services/customer-exam.service";
import { AlertService } from "../../../../../../shared/services/alert.service";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-create-customer-exam',
  templateUrl: './create-customer-exam.component.html',
  styleUrls: ['./create-customer-exam.component.scss']
})
export class CreateCustomerExamComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateCustomerExamComponent>,
    private examService: CustomerExamService,
    private alerService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  customerExamImageString: any;
  description: string;
  imagesPick: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  imagesName: any[] = [];
  examinationDate: any = Date.now() + 86400 * 1000;

  ngOnInit(): void {
    this.getDate();
  }

  getDate() {
    let date = new Date(this.examinationDate),
      month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    this.examinationDate = [year, month, day].join('-');
  }

  processFileExamImage(files) {
    const fileArr = Object.values(files);
    fileArr.forEach((val: any) => {
      const type = val.type.split('/');
      if (type[0] == 'image') {
        this.imagesName.push(val.name);
        const reader = new FileReader();
        reader.readAsDataURL(val);
        reader.onload = () => {
          this.customerExamImageString = reader.result;
          console.log(this.imagesPick.getValue());
          this.imagesPick.next(this.imagesPick.getValue().concat(this.customerExamImageString.split(',')[1].toString()));
        };
      }
    });
  }

  createExam() {
    let exam = new CustomerExamModel();
    exam.CustomerId = this.data.customerId;
    exam.ExaminationDate = this.examinationDate;
    exam.Description = this.description;
    exam.ImageStringList = this.imagesPick.getValue();

    this.examService.createCustomerExam(exam).subscribe(res => {
      console.log(res);
      this.alerService.changeMessage({
        text: 'Tạo phiếu xét nghiệm thành công',
        color: 'green'
      });
      this.closeDialog();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight) + "px";
  }
}
