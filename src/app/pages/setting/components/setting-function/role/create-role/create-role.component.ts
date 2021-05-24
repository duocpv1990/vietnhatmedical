import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleModel } from 'src/app/pages/setting/models/role.model';
import { PrivilegeService } from 'src/app/pages/setting/services/privilege.service';
import { RoleService } from 'src/app/pages/setting/services/role.service';
import { AlertService } from 'src/app/shared/services/alert.service';



@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
  name: string;
  description: string;
  privilegeIdList: Array<number> = [];
  privileges: any;

  constructor(
    private roleService: RoleService,
    private alertService: AlertService,
    private privilegeService: PrivilegeService,
    public dialogRef: MatDialogRef<CreateRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getPrivilegeList()
    }, 100)
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getPrivilegeList() {
    this.privilegeService.list().subscribe(res => {
      this.privileges = res;
      console.log('DS phan quyen', this.privileges);
    });
  }

  selectedPrivilege(privilegeId) {
    if (this.privilegeIdList.includes(privilegeId)) {
      let index = this.privilegeIdList.findIndex(i => i === privilegeId);
      this.privilegeIdList.splice(index, 1);
    } else {
      this.privilegeIdList.push(privilegeId);
    }

    console.log('roleId đã chọn', this.privilegeIdList);

  }

  createRole() {
    let roleModel = new RoleModel();
    roleModel.Name = this.name;
    roleModel.Description = this.description;
    roleModel.PrivilegeIdList = this.privilegeIdList;
    this.roleService.create(roleModel).subscribe(res => {
      this.alertService.changeMessage({
        text: 'Tạo nhóm chức năng thành công',
        color: 'green'
      });
      this.closeDialog();
    })
  }

}
