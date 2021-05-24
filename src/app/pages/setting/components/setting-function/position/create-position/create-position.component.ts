import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PositionModel } from 'src/app/pages/setting/models/position.model';
import { PositionService } from 'src/app/pages/setting/services/position.service';
import { RoleService } from 'src/app/pages/setting/services/role.service';
import { AlertService } from 'src/app/shared/services/alert.service';



@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.scss']
})
export class CreatePositionComponent implements OnInit {
  name: string;
  description: string;
  roleIdList: Array<number> = [];
  roleList: any;

  constructor(
    private positionService: PositionService,
    private alertService: AlertService,
    private roleService: RoleService,
    public dialogRef: MatDialogRef<CreatePositionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getRoleList();
    }, 100)

  }

  getRoleList() {
    this.roleService.list().subscribe(res => {
      this.roleList = res.reverse();
      console.log('DS role', this.roleList);

    })
  }

  selectedRoles(roleId) {
    if (this.roleIdList.includes(roleId)) {
      let index = this.roleIdList.findIndex(i => i === roleId);
      this.roleIdList.splice(index, 1);
    } else {
      this.roleIdList.push(roleId);
    }

    console.log('roleId đã chọn', this.roleIdList);

  }

  createPosition() {
    let position = new PositionModel();
    position.Name = this.name;
    position.Description = this.description;
    position.RoleIdList = this.roleIdList;
    this.positionService.create(position).subscribe(res => {
      this.alertService.changeMessage({
        text: 'Tạo chức vụ thành công',
        color: 'green'
      });
      this.closeDialog();
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
