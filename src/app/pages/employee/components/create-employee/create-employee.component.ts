import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { AlertService } from '../../../../shared/services/alert.service';

import { EmployeeModel } from '../../models/employee.model';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit, DoCheck {

  constructor(public employeeService: EmployeeService,
    public router: Router,
    public alertService: AlertService) { }

  companyDepartmentList: any;
  positions: any;
  departments: any;
  profileImagePath: any;
  profileImageString: any;
  phone: number;
  idCardNumber: number;
  email: string;
  name: string;
  birthDay: string = '1990-01-01';
  genderType: number = 2;
  address: string;
  password: any;
  confirmPassword: any;
  type: number;
  state: string;
  city: string = 'Hà Nội';
  positionIdList: Array<number> = [2];
  departmentIdList: Array<number> = [1];
  hasNumber: boolean = false;
  isLowerCase: boolean = false;


  ngOnInit(): void {
    this.getAllPosition();
    this.getDepartmentList();
  }

  ngDoCheck(){
    // this.validPassword();
  }

  validPassword(){
    if (this.password !== '') {
      // this.isLowerCase = this.password.toLowerCase() == this.password ? false : true; // == -> lowercase
      this.hasNumber = !!this.password.match(/\d+/);      
    }
  }

  isNumber(value: any){
    return isNaN(value);
  }

  chooseGenderType(type: number) {
    this.genderType = type;
  }

  processFileProfileImage(files: File) {
    var reader = new FileReader();
    this.profileImagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.profileImageString = reader.result;
    };
  }

  createEmployee() {
    let employee = new EmployeeModel();
    employee.Name = this.name;
    employee.Phone = this.phone;
    employee.DOB = this.birthDay;
    employee.Gender = this.genderType;
    employee.ListPosition = this.positionIdList;
    employee.Type = this.type;
    employee.State = this.state;
    employee.City = this.city;
    employee.Email = this.email;
    employee.Password = this.password;
    employee.ConfirmPassword = this.confirmPassword;
    employee.CompanyDepartmentList = this.departmentIdList;
    employee.ImageURL = this.profileImageString.split(',')[1];
    this.employeeService.createEmployee(employee).subscribe(res => {
    console.log(employee);
    
    },(err) => {
      console.log(err);
      
      this.alertService.changeMessage({
        color: 'red',
        text: `Vui lòng kiểm tra lại sdt, mật khẩu hoặc email đã tồn tại!`
      });
    }, () => {
      this.alertService.changeMessage({
        color: 'green',
        text: `Tạo hồ sơ nhân viên thành công!`
      });
      this.router.navigateByUrl('/pages/employee');
    });
  }

  getAllPosition() {
    this.employeeService.getPosition().subscribe(data => {
      console.log('Position', data);
      this.positions = data;
    });
  }

  getDepartmentList() {
    this.employeeService.getDepartment().subscribe(data => {
      this.departments = data;
      console.log("phong` ban",this.departments);
    });
  }

  choosePosition(positionId: number) {
    if (this.positionIdList.length == 1) {
      this.positionIdList = [];
      this.positionIdList.push(+positionId);
    }
    else {
      this.positionIdList = [];
      this.positionIdList.push(+positionId);
    }
  }

  chooseDepartment(departmentId: number) {
    if (this.departmentIdList.length == 1) {
      this.departmentIdList = [];
      this.departmentIdList.push(+departmentId);
    }
    else {
      this.departmentIdList = [];
      this.departmentIdList.push(+departmentId);    
    }

  }


}
