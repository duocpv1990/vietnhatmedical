import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BranchService } from 'src/app/pages/setting/services/branch.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-delete-branch',
  templateUrl: './delete-branch.component.html',
  styleUrls: ['./delete-branch.component.scss']
})
export class DeleteBranchComponent implements OnInit {
  branch: any;

  constructor(
    private branchService: BranchService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<DeleteBranchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteBranch() {
    this.branchService.delete(this.data.branchId).subscribe(res => {
      this.closeDialog();
      this.alertService.changeMessage({
        text: 'Xóa chi nhánh thành công!',
        color: 'green'
      });
    });
  }

}
