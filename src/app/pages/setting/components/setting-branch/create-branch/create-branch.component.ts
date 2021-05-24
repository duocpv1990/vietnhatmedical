import { Component, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BranchModel } from '../../../models/branch.model';
import { BranchService } from '../../../services/branch.service';
import { AlertService } from '../../../../../shared/services/alert.service';

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.scss']
})
export class CreateBranchComponent implements OnInit {
  fullName: string;
  constructor(
    public branchService: BranchService,
    public dialogRef: MatDialogRef<CreateBranchComponent>,
    public alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createBranch() {
    let branch = new BranchModel();
    branch.FullName = this.fullName;
    this.branchService.create(branch).subscribe(res => {
      this.closeDialog();
      this.alertService.changeMessage({
        text: 'Tạo chi nhánh thành công!',
        color: 'green'
      })
    });
  }

}
