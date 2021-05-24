import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { SettingRoutingModule } from './setting-routing.module';

import { SettingComponent } from './setting.component';

import { SettingFunctionComponent } from './components/setting-function/setting-function.component';
import { CreatePositionComponent } from './components/setting-function/position/create-position/create-position.component';
import { EditPositionComponent } from './components/setting-function/position/edit-position/edit-position.component';
import { DeletePositionComponent } from './components/setting-function/position/delete-position/delete-position.component';
import { CreateRoleComponent } from './components/setting-function/role/create-role/create-role.component';
import { EditRoleComponent } from './components/setting-function/role/edit-role/edit-role.component';
import { DeleteRoleComponent } from './components/setting-function/role/delete-role/delete-role.component';
import { CreatePrivilegeComponent } from './components/setting-function/privilege/create-privilege/create-privilege.component';
import { EditPrivilegeComponent } from './components/setting-function/privilege/edit-privilege/edit-privilege.component';
import { DeletePrivilegeComponent } from './components/setting-function/privilege/delete-privilege/delete-privilege.component';
import { SettingBranchComponent } from './components/setting-branch/setting-branch.component';
import { SettingNotificationComponent } from './components/setting-notification/setting-notification.component';
import { CreateNotificationComponent } from './components/setting-notification/create-notification/create-notification.component';
import { EditNotificationComponent } from './components/setting-notification/edit-notification/edit-notification.component';
import { DeleteNotificationComponent } from './components/setting-notification/delete-notification/delete-notification.component';
import { CareScheduleComponent } from './components/care-schedule/care-schedule.component';
import { CreateBranchComponent } from './components/setting-branch/create-branch/create-branch.component';
import { EditBranchComponent } from './components/setting-branch/edit-branch/edit-branch.component';
import { DeleteBranchComponent } from './components/setting-branch/delete-branch/delete-branch.component';
import { AddPersonnelBranchComponent } from './components/setting-branch/add-personnel-branch/add-personnel-branch.component';


@NgModule({
  declarations: [
    SettingComponent,
    CreatePositionComponent,
    EditPositionComponent,
    DeletePositionComponent,
    CreateRoleComponent,
    EditRoleComponent,
    DeleteRoleComponent,
    CreatePrivilegeComponent,
    EditPrivilegeComponent,
    DeletePrivilegeComponent,
    SettingFunctionComponent,
    SettingBranchComponent,
    SettingNotificationComponent,
    CreateNotificationComponent,
    EditNotificationComponent,
    DeleteNotificationComponent,
    CareScheduleComponent,
    CreateBranchComponent,
    EditBranchComponent,
    DeleteBranchComponent,
    AddPersonnelBranchComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule
  ]
})
export class SettingModule { }
