import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//component
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module')
          .then(m => m.HomeModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module')
          .then(m => m.CustomerModule)
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module')
          .then(m => m.EmployeeModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module')
          .then(m => m.ScheduleModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module')
          .then(m => m.ReportModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('./setting/setting.module')
          .then(m => m.SettingModule)
      },
      {
        path: 'document',
        loadChildren: () => import('./document/document.module')
          .then(m => m.DocumentModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
