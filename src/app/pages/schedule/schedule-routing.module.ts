import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';


const routes: Routes = [
  {
    path: '',
    component: ScheduleListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
