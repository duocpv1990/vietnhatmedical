import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { CreateBranchComponent } from './create-branch/create-branch.component';
import { BranchService } from '../../services/branch.service';
import { EditBranchComponent } from './edit-branch/edit-branch.component';
import { DeleteBranchComponent } from './delete-branch/delete-branch.component';
import { AddPersonnelBranchComponent } from './add-personnel-branch/add-personnel-branch.component';


@Component({
  selector: 'app-setting-branch',
  templateUrl: './setting-branch.component.html',
  styleUrls: ['./setting-branch.component.scss']
})
export class SettingBranchComponent implements OnInit {
  employees: any;
  displayedEmployeeColumns = ['employeeId', 'name', 'position', 'dapartment'];
  branches: any;
  displayedBranchColumns = ['branchName'];

  constructor(
    public dialog: MatDialog,
    public branchService: BranchService
  ) { }

  ngOnInit(): void {
    this.getBranches();
  }

  createBranch() {
    this.dialog.open(CreateBranchComponent).afterClosed().subscribe(() => {
      this.getBranches();
    });
  }

  editBranch(branch) {
    this.dialog.open(EditBranchComponent, {
      data: {
        branch: branch
      }
    }).afterClosed().subscribe(() => {
      this.getBranches();
    });
  }

  deleteBranch(branchId: number) {
    this.dialog.open(DeleteBranchComponent, {
      data: {
        branchId: branchId
      }
    }).afterClosed().subscribe(() => {
      this.getBranches();
    });
  }

  getBranches() {
    this.branchService.list().subscribe(res => {
      this.branches = res;
      this.getEmployee(this.branches[0].BranchId);
    });
  }

  getEmployee(branchId: number) {
    this.branchService.getEmployeeByBranchId(branchId).subscribe(res => {
      this.employees = res;
    });
  }

  addPersonnelBranch(){
    this.dialog.open(AddPersonnelBranchComponent).afterClosed().subscribe(() => {
      this.getBranches();
    });
  }


}
