import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

//service
import { AlertService } from "src/app/shared/services/alert.service";
import { CustomerOperationResultService } from "../../../../../../../../services/customer-operation-result.service";

//model
import { CustomerOperationResultModel } from "../../../../../../../../models/customer-operation-result.model";

@Component({
  selector: "app-surgery-result-detail",
  templateUrl: "./surgery-result-detail.component.html",
  styleUrls: ["./surgery-result-detail.component.scss"],
})
export class SurgeryResultDetailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SurgeryResultDetailComponent>,
    private alerService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private operationResultService: CustomerOperationResultService
  ) { }

  isSOS: boolean = false;
  resultRating: number;
  description: string;
  notes: string;
  // beforeImageString: any;
  // afterImageString: any;
  // sosReason: string;

  ngOnInit(): void {
    console.log("KQ", this.data.surgeryResult);
    if (this.data.surgeryResult !== null) {
      this.isSOS = this.data.surgeryResult.IsSos;
      this.notes = this.data.surgeryResult.Notes;
      this.resultRating = this.data.surgeryResult.ResultRating;
    }

    // this.beforeImageString = this.data.surgeryResult.BeforeImageURL;
    // this.afterImageString =this.data.surgeryResult.AfterImageURL;
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

  updateSurgeryResult() {
    let surgeryResult = new CustomerOperationResultModel();
    surgeryResult.ResultRating = this.resultRating;
    surgeryResult.IsSos = this.isSOS;
    surgeryResult.Notes = this.notes;
    // surgeryResult.BeforeImageString = this.beforeImageString.split(',')[1];
    // surgeryResult.AfterImageString = this.afterImageString.split(',')[1];
    // surgeryResult.Description = this.description;
    this.operationResultService
      .update(surgeryResult, this.data.surgeryResult.OperationResultId)
      .subscribe((res) => {
        console.log(res);
        this.alerService.changeMessage({
          text: "Sửa Kết quả phẫu thuật thành công",
          color: "green",
        });
        this.closeDialog();
      });
  }

  deleteSurgeryResult() {
    this.operationResultService
      .delete(this.data.surgeryResult.OperationResultId)
      .subscribe((res) => {
        console.log(res);
        this.alerService.changeMessage({
          text: "Xóa Kết quả phẫu thuật thành công",
          color: "green",
        });
        this.closeDialog();
      });
  }
}
