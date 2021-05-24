import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from "../../../../services/employee.service";
import { AlertService } from "../../../../../../shared/services/alert.service";

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
    public employeeService: EmployeeService,
    public alertService: AlertService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
  
deleteEmployee(){
  this.employeeService.delete(this.data.EmployeeId).subscribe(data => {
    this.alertService.changeMessage({
      color: 'green',
      text: `Xóa nhân viên thành công`
    });
    this.router.navigateByUrl('/pages/employee');
    this.dialogRef.close();
  }) 
}

  ngOnInit(): void {
  }
}
