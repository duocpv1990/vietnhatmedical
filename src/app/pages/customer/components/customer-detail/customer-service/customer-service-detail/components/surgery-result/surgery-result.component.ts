import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

//service
import { CustomerOperationResultService } from "../../../../../../services/customer-operation-result.service";

//component
import { CreateSurgeryResultComponent } from "./dialog/create-surgery-result/create-surgery-result.component";
import { SurgeryResultDetailComponent } from "./dialog/surgery-result-detail/surgery-result-detail.component";

@Component({
  selector: "app-surgery-result",
  templateUrl: "./surgery-result.component.html",
  styleUrls: ["./surgery-result.component.scss"],
})
export class SurgeryResultComponent implements OnInit {
  @Input("currentService") currentService: any;

  constructor(
    private operationResultService: CustomerOperationResultService,
    private dialog: MatDialog
  ) { }

  surgeryResult: any;
  isSOS: boolean;
  sosReason: string;
  resultRating: any = "1";
  temp: any;

  newStyle = {
    "background-color": "red",
  };
  oldStyle = {
    "background-color": "gray",
  };

  ngOnInit(): void {
    this.getSurgeryResult();
    this.temp = this.isSOS;
  }

  chooseSOS() {
    this.isSOS = !this.isSOS;
  }

  getSurgeryResult() {
    this.operationResultService
      .getOperationResultByServiceId(this.currentService.OperationId)
      .subscribe((data) => {
        this.surgeryResult = data;
      });
  }

  openCreateForm() {
    this.dialog
      .open(CreateSurgeryResultComponent, {
        data: {
          operationId: this.currentService.OperationId,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.getSurgeryResult();
      });
  }

  openDetailForm() {
    this.dialog
      .open(SurgeryResultDetailComponent, {
        data: {
          surgeryResult: this.surgeryResult,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.getSurgeryResult();
        let closeData = this.getSurgeryResult();
        console.log("closed dialog", closeData);
      });
  }

  // ngOnChanges(){
  //   this.getSurgeryResult();
  // }
}
