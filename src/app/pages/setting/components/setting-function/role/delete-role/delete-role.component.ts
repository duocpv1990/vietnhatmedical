import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from 'src/app/pages/setting/services/role.service';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.scss']
})
export class DeleteRoleComponent implements OnInit {

  constructor(
    private roleService: RoleService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<DeleteRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log('roleId', this.data.roleId);

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteRole() {
    this.roleService.delete(this.data.roleId).subscribe(res => {
      this.alertService.changeMessage({
        text: 'Xóa chức năng thành công',
        color: 'green'
      });
      this.closeDialog();
    })
  }

}
