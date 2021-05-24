import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BranchModel } from '../../../models/branch.model';
import { BranchService } from '../../../services/branch.service';
import { AlertService } from '../../../../../shared/services/alert.service';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.scss']
})
export class EditBranchComponent implements OnInit {
  branch: BranchModel;

  constructor(
    public dialogRef: MatDialogRef<EditBranchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private branchService: BranchService,
    public alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.branch = this.data.branch;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  editBranch() {
    let branch = new BranchModel();
    branch.FullName = this.branch.FullName;
    this.branchService.update(branch, this.branch.BranchId).subscribe(res => {
      this.closeDialog();
      this.alertService.changeMessage({
        text: 'Sửa chi nhánh thành công!',
        color: 'green'
      });
    }

    )
  }

}
