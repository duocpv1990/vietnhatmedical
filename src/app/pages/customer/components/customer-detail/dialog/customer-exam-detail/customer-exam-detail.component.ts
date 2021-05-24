import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//service
import { CustomerExamService } from "../../../../services/customer-exam.service";
import { AlertService } from "../../../../../../shared/services/alert.service";

//model
import { CustomerExamModel } from "../../../../models/customer-exam.model";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-customer-exam-detail',
  templateUrl: './customer-exam-detail.component.html',
  styleUrls: ['./customer-exam-detail.component.scss']
})
export class CustomerExamDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CustomerExamDetailComponent>,
    private customerExamService: CustomerExamService,
    private alerService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  customerExamImageString: any;
  description: string;
  examinationDate: string;
  imagesPick: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  imagesName: any[] = [];

  ngOnInit(): void {
    console.log('current exam: ', this.data.exam);
    if (this.data.exam.ExaminationDate !== null) {
      this.examinationDate = this.data.exam.ExaminationDate.split('T')[0];
    } else {
      this.examinationDate = '';
    }
    this.description = this.data.exam.Description;
    this.customerExamImageString = this.data.exam.CustomerExamImageURL;
  }

  processFileExamImage(files) {
    const fileArr = Object.values(files);
    fileArr.forEach((val: any) => {
      this.imagesName.push(val.name);
      const reader = new FileReader();
      reader.readAsDataURL(val);
      reader.onload = () => {
        this.customerExamImageString = reader.result;
        this.imagesPick.next(this.imagesPick.getValue().concat(this.customerExamImageString.split(",")[1]));
      };
    });
  }

  updateExam() {
    let exam = new CustomerExamModel();
    exam.ExaminationDate = this.examinationDate;
    exam.Description = this.description;
    exam.ImageStringList = this.imagesPick.getValue();
    // this.customerExamService.updateImageExam(this.data.exam.CustomerExamId, this.imagesPick.getValue()).subscribe(()=>{
    //   this.alerService.changeMessage({
    //     text: 'Cập nhật phiếu xét nghiệm thành công',
    //     color: 'green'
    //   });
    //   this.closeDialog();
    // });
    this.customerExamService.updateExam(exam, this.data.exam.CustomerExamId).subscribe((res) => {
      console.log(res);
      this.alerService.changeMessage({
        text: 'Cập nhật phiếu xét nghiệm thành công',
        color: 'green'
      });
      this.closeDialog();
    });
  }

  deleteExam() {
    this.customerExamService.delete(this.data.exam.CustomerExamId).subscribe(() => {
      this.alerService.changeMessage({
        text: 'Xóa phiếu xét nghiệm thành công',
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
