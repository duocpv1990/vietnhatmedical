import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PositionModel } from 'src/app/pages/setting/models/position.model';
import { PositionService } from 'src/app/pages/setting/services/position.service';
import { RoleService } from 'src/app/pages/setting/services/role.service';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.scss']
})
export class EditPositionComponent implements OnInit {
  name: string;
  description: string;
  roleIdList: Array<number> = [];
  roleList: any;
  position: any;
  selectedRole = [];

  constructor(
    private positionService: PositionService,
    private alertService: AlertService,
    private roleService: RoleService,
    public dialogRef: MatDialogRef<EditPositionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);

    setTimeout(() => {
      this.getRoleList();
    }, 100);
    this.getRoleByPosId();
    this.name = this.data.position.Name;

  }

  getRoleList() {
    this.roleService.list().subscribe(res => {
      this.roleList = res;
    })
  }

  getRoleByPosId() {
    this.positionService.getRoleByPosId(this.data.position.PositionId).subscribe(res => {
      console.log(res);

      this.selectedRole = res.map(i => i.RoleID)
    })
  }
  selectedRoles(role) {
    this.roleIdList = role;
    console.log('DS role', this.roleIdList);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  editPosition() {
    let positionId = this.data.position.PositionId
    let position = new PositionModel();
    position.Name = this.name;
    position.Description = this.description;
    position.RoleIdList = this.roleIdList;
    this.positionService.update(position, positionId).subscribe(res => {
      this.alertService.changeMessage({
        text: 'Sửa chức vụ thành công',
        color: 'green'
      });
      this.closeDialog();
    })
  }

}
