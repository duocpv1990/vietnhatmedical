import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

//service
import { EmployeeService } from "../../../services/employee.service";
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from "../../../../../shared/services/alert.service";
import { ActivatedRoute } from '@angular/router';

//model
import { EmployeeModel } from "../../../models/employee.model";
import { DeleteEmployeeComponent } from '../dialog/delete-employee/delete-employee.component';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit, OnDestroy {

  @Output() messageEvent = new EventEmitter<any>();

  constructor(
    public employeeService: EmployeeService,
    public activatedRoute: ActivatedRoute,
    public alerService: AlertService,
    public dialog: MatDialog
  ) { }

  deparmentList: any;
  positionIdList: any;
  currentEmployee: any;
  currentEmployeeId: any;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: number;
  ProfileImageURL: string;
  ImageURL: string;
  city: string;
  state: string;
  type: number;
  gender: number;
  DOB: any;
  positions: any;
  selectedPosition = [];
  employeeAvatarPath: any;
  employeeAvatarString: any;
  departmentId: number;
  departmentIdList: Array<number> = [];
  localEmployeeId: any;
  email: string;
  iPPhoneId: string;
  employee;
  positionId: number;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => this.currentEmployeeId = +param.get('employeeId'));
    this.getEmployee();
    this.getCaseEmployee();
    this.getPosition();
    this.getDeparment();
  }

  ngOnDestroy(): void {
    this.messageEvent.unsubscribe();
  }

  getEmployee() {
    this.employeeService.get(this.currentEmployeeId).subscribe(res => {
      this.employee = res;
      console.log('nhan vien', this.employee);
      this.fullName = this.employee.FullName;
      this.phone = this.employee.Phone;
      this.city = this.employee.City;
      this.state = this.employee.State;
      this.firstName = this.employee.FirstName;
      this.lastName = this.employee.LastName;
      this.type = this.employee.Type;
      this.departmentId = this.employee.CompanyDepartmentId;
      this.gender = +this.employee.Gender;
      this.email = this.employee.UserEmail;
      this.iPPhoneId = this.employee.IPPhoneId;
      this.positionId = this.employee.PositionId;
      if (this.employee.ListPositionId != null) {
        this.positionIdList = +this.employee.ListPositionId[0];
      }
      if (this.employee.DOB == null) {
        this.DOB == "";
      } else {
        this.DOB = this.employee.DOB.split('T')[0];
      }
      this.employeeAvatarString = this.employee.ProfileImageURL;
    });


  }

  processFileEmployeeAvatar(files: File) {
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.employeeAvatarString = reader.result;
    };
  }

  //truyền dữ liệu nhân viên hiện tại cho component cha (employee-detail)
  sendMessage(data: object) {
    this.messageEvent.emit(data);
  }

  getDeparment() {
    this.employeeService.getDepartment().subscribe(res => {
      this.deparmentList = res;
      console.log(this.deparmentList);

    });
  }

  getPosition() {
    this.employeeService.getPosition().subscribe(data => {
      this.positions = data;
    });
  }

  chooseGenderType(gender: number) {
    this.gender = gender;
  }


  getCaseEmployee() {

    this.localEmployeeId = +JSON.parse(localStorage.getItem('access_user')).EmployeeId;
    if (this.currentEmployeeId != this.localEmployeeId) {
      this.getCurrent();
    }
    else {
      this.getLocalEmployee();
    }
  }
  getCurrent() {
    this.employeeService.getAllEmployee(1).subscribe(data => {
      this.currentEmployee = data.find(employee => employee.EmployeeId == this.currentEmployeeId);
    });
  }
  getLocalEmployee() {
    this.employeeService.getLocalEmployee().subscribe(res => {
      this.currentEmployee = res;
    });

  }

  updateEmployeeInfo() {
    let personalInfo = new EmployeeModel();
    personalInfo.Name = this.fullName;
    personalInfo.City = this.city;
    personalInfo.State = this.state;
    personalInfo.Phone = this.phone;
    personalInfo.FirstName = this.firstName;
    personalInfo.LastName = this.lastName;
    personalInfo.Type = this.type;
    personalInfo.Gender = this.gender;
    personalInfo.DOB = this.DOB;
    personalInfo.ListPosition = this.positionIdList;
    personalInfo.CompanyDepartmentList = this.departmentIdList;
    personalInfo.IPPhoneId = this.iPPhoneId;
    if (this.employeeAvatarString == this.currentEmployee.ProfileImageURL) {
      personalInfo.ImageURL = null;
    } else {
      personalInfo.ImageURL = this.employeeAvatarString.split(',')[1];
    }
    this.employeeService.update(personalInfo, this.currentEmployeeId).subscribe(data => {
      this.alerService.changeMessage({
        color: 'green',
        text: `Sửa thông tin nhân viên thành công`
      })
    }, null, () => {
      // this.getCurrentEmployee();
    });
  };

  choosePosition(positionId: number) {
    this.positionIdList = [];
    this.positionIdList.push(+positionId);
  }

  chooseDepartment(departmentId: number) {
    this.departmentIdList = [];
    this.departmentIdList.push(+departmentId);
  }

  openDeleteForm() {
    this.dialog.open(DeleteEmployeeComponent, {
      data: {
        EmployeeId: this.currentEmployeeId
      }
    });
  }

}
