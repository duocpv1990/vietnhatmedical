import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';

import { CustomPipeModule } from '../../shared/pipe/pipe.module';
import { NoStraightBrick } from '../../shared/pipe/pipe.custom';
import { CreateScheduleComponent } from './components/schedule-list/dialog/create-schedule/create-schedule.component';
import { ScheduleDetailComponent } from './components/schedule-list/dialog/schedule-detail/schedule-detail.component';

@NgModule({
  declarations: [ScheduleListComponent, CreateScheduleComponent, ScheduleDetailComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    SharedModule,
    CustomPipeModule
  ]
})
export class ScheduleModule { }
