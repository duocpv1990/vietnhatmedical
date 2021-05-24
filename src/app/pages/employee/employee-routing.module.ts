import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from '../employee/components/employee-list/employee-list.component';
import { EmployeeDetailComponent } from '../employee/components/employee-detail/employee-detail.component';

//component
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';

const routes: Routes = [

  {
    path: '',
    component: EmployeeListComponent
  },
  {
    path: 'create',
    component: CreateEmployeeComponent
  },
  {
    path: ':employeeId',
    component: EmployeeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
