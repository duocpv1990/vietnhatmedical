import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//module
import { SharedModule } from "../../shared/shared.module";
import { EmployeeRoutingModule } from './employee-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

//components
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeeInfoComponent } from './components/employee-detail/employee-info/employee-info.component';
import { DeleteEmployeeComponent } from "./components/employee-detail/dialog/delete-employee/delete-employee.component";
import { EmployeeCustomerComponent } from './components/employee-detail/employee-customer/employee-customer.component';
import { EmployeeCalenderComponent } from './components/employee-detail/employee-calender/employee-calender.component';
import { AssignCustomerComponent } from './components/employee-detail/dialog/assign-customer/assign-customer.component';
import { EmployeeKpiComponent } from './components/employee-detail/employee-kpi/employee-kpi.component';

@NgModule({
  declarations: [
    EmployeeListComponent, 
    CreateEmployeeComponent,
    EmployeeDetailComponent, 
    EmployeeInfoComponent, 
    DeleteEmployeeComponent, 
    EmployeeCalenderComponent,
    EmployeeCustomerComponent,
    AssignCustomerComponent,
    EmployeeKpiComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    EmployeeRoutingModule,
    SharedModule,
    MatTooltipModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class EmployeeModule { }
