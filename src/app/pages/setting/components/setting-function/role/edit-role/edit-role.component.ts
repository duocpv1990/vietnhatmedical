import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleModel } from 'src/app/pages/setting/models/role.model';
import { PrivilegeService } from 'src/app/pages/setting/services/privilege.service';
import { RoleService } from 'src/app/pages/setting/services/role.service';
import { AlertService } from 'src/app/shared/services/alert.service';



@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  name: string;
  description: string;
  privilegeIdList: Array<number> = [];
  selectedPrivileges: any;
  selectedPrivilegeId = [];
  privileges: any;
  role: any;

  constructor(
    private roleService: RoleService,
    private alertService: AlertService,
    private privilegeService: PrivilegeService,
    public dialogRef: MatDialogRef<EditRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getCurrentRole();
      this.getSelectedPrivileges();
      this.getAllPrivileges();
    }, 100);
    console.log('data', this.data.role);
    this.name = this.data.role.Name;
  }

  getCurrentRole() {
    this.roleService.get(this.data.roleId).subscribe(res => {
      this.role = res;
      console.log('ds role', this.role);

    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getAllPrivileges() {
    this.privilegeService.list().subscribe(res => {
      this.privileges = res;
    })
  }

  getSelectedPrivileges() {
    this.privilegeService.getPrivilegeByRoleId(this.data.role.RoleID).subscribe(res => {
      this.selectedPrivileges = res;
      this.selectedPrivilegeId = this.selectedPrivileges.map(privilege => {
        return privilege.PrivilegeId;
      });
      console.log('DS phan quyen da chon', this.selectedPrivilegeId);
    });
  }

  choosePrivileges(privilege) {
    this.privilegeIdList = privilege;
    console.log('DS privilege', this.privilegeIdList);
  }

  editRole() {
    let roleId = this.data.role.RoleID;
    let roleModel = new RoleModel();
    roleModel.Name = this.name;
    roleModel.PrivilegeIdList = this.privilegeIdList;
    this.roleService.update(roleModel, roleId).subscribe(res => {
      this.alertService.changeMessage({
        text: 'Sửa thành công',
        color: 'green'
      });
      this.closeDialog();
    })
  }

}
