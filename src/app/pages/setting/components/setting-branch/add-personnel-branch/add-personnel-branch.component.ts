import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../services/branch.service';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/pages/employee/services/employee.service';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
  selector: 'app-add-personnel-branch',
  templateUrl: './add-personnel-branch.component.html',
  styleUrls: ['./add-personnel-branch.component.scss']
})
export class AddPersonnelBranchComponent implements OnInit {
  branches: any;
  EmployeeList: any;
  employeeId:number;
  branchId:number;
  displayedEmployeeColumns = ['choose','employeeId', 'name', 'position', 'dapartment'];
  displayedBranchColumns = ['branchName'];
  dataSource ;
  addList=[];
 
  constructor(
    public alertService: AlertService,
    public employeeService : EmployeeService , 
    public branchService : BranchService,
    public dialoRef: MatDialogRef<AddPersonnelBranchComponent>) { }

  ngOnInit(): void {
    this.getBranches();
    this.getAllEmployeeList(1);
  }
// lấy nhánh
  getBranches() {
    this.branchService.list().subscribe(res => {
      this.branches = res;
    });
  }
// lấy tất cả danh sách nhân viên
  getAllEmployeeList(page: number) {
    this.employeeService.getAllEmployee(page).subscribe(res => {
      this.EmployeeList = res;
      this.dataSource = this.EmployeeList;
    })
  }
// chọn nhân viên
  chooseEmp(id:number){
    this.employeeId = id;
    if (this.addList.indexOf(id)>=0) {
      this.addList.splice(this.addList.indexOf(id), 1)
    }
    else{
      this.addList.push(id)
    }    
  }
// chọn chi nhánh
  chooseBranch(id:number){
    this.branchId = id;
  } 
//them nhan vien vao chi nhanh
  addEmpInBarnch(){

   if (this.addList.length==0) {
     this.alertService.changeMessage({
      color: 'red',
      text: `Lỗi`
    })    
   }
   else if(this.addList.length>0){
     for (let index = 0; index < this.addList.length; index++) {
       this.employeeService.addEmployeeToBranch({EmployeeId:this.addList[index],BranchId:this.branchId}).subscribe(res=>{
       })
     }
     this.alertService.changeMessage({
      color: 'green',
      text: `Thêm nhân viên vào chi nhánh thành công!`
    })
   }
   this.dialoRef.close();

  }

  Close(){
    this.dialoRef.close();
  }


}
