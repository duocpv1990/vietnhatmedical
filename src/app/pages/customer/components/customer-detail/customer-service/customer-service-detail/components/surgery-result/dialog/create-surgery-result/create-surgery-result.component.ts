import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//service
import { AlertService } from 'src/app/shared/services/alert.service';
import { CustomerOperationResultService } from "../../../../../../../../services/customer-operation-result.service";

//model
import { CustomerOperationResultModel } from "../../../../../../../../models/customer-operation-result.model";

@Component({
  selector: 'app-create-surgery-result',
  templateUrl: './create-surgery-result.component.html',
  styleUrls: ['./create-surgery-result.component.scss']
})
export class CreateSurgeryResultComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateSurgeryResultComponent>,
    private alerService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private operationResultService: CustomerOperationResultService
  ) { }

  // beforeImageString: any;
  // afterImageString: any;
  isSOS: boolean = false;
  sosReason: string;
  resultRating: any = '1';
  description: string;
  notes: string;

  ngOnInit(): void {
  }

  chooseSOS() {
    this.isSOS = !this.isSOS;
  }

  // processFileBeforeSurgeryImg(files) {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = (_event) => {
  //     this.beforeImageString = reader.result;
  //   }
  // }

  // processFileAfterSurgeryImg(files) {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = (_event) => {
  //     this.afterImageString = reader.result;
  //   }
  // }

  closeDialog(): void {
    this.dialogRef.close();
  }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight)+"px";
  }

  createSurgeryResult() {
    let operationResult = new CustomerOperationResultModel();
    operationResult.OperationId = this.data.operationId;
    operationResult.IsSos = this.isSOS;
    // operationResult.BeforeImageString = this.beforeImageString.split(',')[1];
    // operationResult.AfterImageString = this.afterImageString.split(',')[1];
    // operationResult.Description = this.description;
    // operationResult.SOSReason = this.sosReason;
    operationResult.ResultRating = this.resultRating;
    operationResult.Notes = this.notes;
    this.operationResultService.create(operationResult).subscribe(res => {
      console.log(res);
        this.alerService.changeMessage({
          text: 'Tạo Kết quả phẫu thuật thành công',
          color: 'green'
        });
        this.closeDialog();
    });
  }

}
