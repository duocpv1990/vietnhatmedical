import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from "@angular/router";

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from "@angular/cdk/collections";

import { PositionService } from '../../services/position.service';
import { RoleService } from '../../services/role.service';
import { PrivilegeService } from '../../services/privilege.service';


import { BaseComponent } from '../../../../shared/components/base.component';
import { CreatePositionComponent } from './position/create-position/create-position.component';
import { DeletePositionComponent } from './position/delete-position/delete-position.component';
import { EditPositionComponent } from './position/edit-position/edit-position.component';
import { CreateRoleComponent } from './role/create-role/create-role.component';
import { EditRoleComponent } from './role/edit-role/edit-role.component';
import { CreatePrivilegeComponent } from './privilege/create-privilege/create-privilege.component';
import { RoleModel } from 'src/app/pages/setting/models/role.model';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
  selector: 'app-setting-function',
  templateUrl: './setting-function.component.html',
  styleUrls: ['./setting-function.component.scss']
})
export class SettingFunctionComponent extends BaseComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  positions: any;
  privileges: any;
  positionId: number;
  positionDataSource: any;
  roleDataSource: any;
  privilegeDataSource: any;
  selectedPositionId: number;
  selectedRoleId: number;
  roles: any;
  displayedPositonColumns = [
    'Chức vụ'
  ];
  displayedRoleColumns = [
    'Nhóm chức năng'
  ];
  displayedPrivilegeColumns = [
    'select',
    'Tên chức năng'
  ];
  isPositonAccess: any;
  isRoleAccess: any;
  isPrivilegeAccess: any;
  selectedPrivilegeIds = [];
  selection = new SelectionModel<Element>(true, []);
  selectedPrivileges: any;
  roleId: number;


  constructor(
    private positionService: PositionService,
    private roleService: RoleService,
    private privilegeService: PrivilegeService,
    public dialog: MatDialog,
    public router: Router,
    private alertService: AlertService,
  ) {
    super(router); this.checkToken();
    this.isPositonAccess = this.checkAccess('api/position,GET');
    this.isRoleAccess = this.checkAccess('api/role,GET');
    this.isPrivilegeAccess = this.checkAccess('api/privilege,GET');
  }

  ngOnInit(): void {
    this.getPositonList();
    this.getAllPrivileges();
  }

  getPositonList() {
    this.positionService.list().subscribe(data => {
      this.positions = data.reverse();

      this.positionId = data[0].PositionId;
      this.getRolesByPositionId(this.positionId);
      this.positionDataSource = new MatTableDataSource(this.positions);
      this.positionDataSource.paginator = this.paginator;
    })
  }

  getRolesByPositionId(positionId: number) {
    this.positionId = positionId;
    this.roleService.getRoleListByPositionId(positionId).subscribe(data => {
      this.roles = data;

      this.selectedPositionId = positionId;
      if (this.roles.length === 0) {
        this.roleDataSource = [];
        this.privilegeDataSource = [];
      }
      else {
        this.getPrivilegesByRoleId(data[0].RoleID);
        this.roleDataSource = new MatTableDataSource(this.roles);
      }

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.privilegeDataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllPrivileges() {
    this.privilegeService.list().subscribe(res => {
      this.privileges = res;
      this.privileges.forEach(item => item['checked'] = false);
      if (this.privileges.length === 0) {
        this.privilegeDataSource = [];
      }
      else {
        this.privilegeDataSource = new MatTableDataSource(this.privileges);
      }
    })
  }

  getPrivilegesByRoleId(roleId: number) {
    this.roleId = roleId
    this.privileges.forEach(item => item['checked'] = false);
    this.privilegeService.getPrivilegeByRoleId(roleId).subscribe(data => {
      this.selectedRoleId = roleId;
      this.selectedPrivileges = data;
      let privilegeIds = this.privileges.map(item => item.PrivilegeId);
      this.selectedPrivilegeIds = this.selectedPrivileges.map(item => item.PrivilegeId);

      this.selectedPrivilegeIds.forEach(item => {
        let index = privilegeIds.indexOf(item);
        if (index >= 0) {
          this.privileges[index]["checked"] = true;
        }
      });
      // console.log('privileges', this.selectedPrivileges);
    });
  }

  createPosition() {
    this.dialog.open(CreatePositionComponent).afterClosed().subscribe(() => {
      this.getPositonList();
    })
  }

  deletePosition(positionId) {
    this.dialog.open(DeletePositionComponent, {
      data: {
        positionId: positionId
      }
    }).afterClosed().subscribe(() => {
      this.getPositonList();
    })
  }

  editPosition(positionId) {
    this.dialog.open(EditPositionComponent, {
      data: {
        position: this.positions.find(position => {
          return position.PositionId === positionId;
        })
      }
    }).afterClosed().subscribe(() => {
      this.getPositonList();
    })
  }

  createRole() {
    this.dialog.open(CreateRoleComponent)
  }

  editRole(roleId: number) {
    this.dialog.open(EditRoleComponent, {
      data: {
        role: this.roles.find(role => {
          return role.RoleID === roleId;
        })
      }
    }).afterClosed().subscribe(() => {
      this.getRolesByPositionId(this.positionId);
    })
  }

  createPrivilege() {
    this.dialog.open(CreatePrivilegeComponent)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.privilegeDataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.selectedPrivilegeIds = [];
    } else {
      this.privilegeDataSource.data.forEach(row => {
        this.selectedPrivilegeIds.push(row.position);
        this.selection.select(row);
      });
    }

    this.selectedPrivilegeIds = this.selectedPrivilegeIds.filter(function (value, index, array) {
      return array.indexOf(value) == index;
    });

  }

  choosePrivilege(privilegeId) {
    if (this.selectedPrivilegeIds.includes(privilegeId)) {
      let index = this.selectedPrivilegeIds.findIndex(item => item == privilegeId);
      this.selectedPrivilegeIds.splice(index, 1);
    } else this.selectedPrivilegeIds.push(privilegeId);

  }

  updatePrivilege() {
    let roleModel = new RoleModel();
    roleModel.PrivilegeIdList = this.selectedPrivilegeIds;
    this.roleService.update(roleModel, this.roleId).subscribe(res => {
      this.alertService.changeMessage({
        text: 'Cập nhật thành công',
        color: 'green'
      });
      this.getPrivilegesByRoleId(this.roleId);
    })
  }


}
