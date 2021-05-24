import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrivilegeModel } from 'src/app/pages/setting/models/privilege.model';
import { PrivilegeService } from 'src/app/pages/setting/services/privilege.service';
import { AlertService } from 'src/app/shared/services/alert.service';



@Component({
  selector: 'app-create-privilege',
  templateUrl: './create-privilege.component.html',
  styleUrls: ['./create-privilege.component.scss']
})
export class CreatePrivilegeComponent implements OnInit {
  name: string;
  description: string;

  constructor(
    private privilegeService: PrivilegeService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<CreatePrivilegeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createPrivilege() {
    let privilege = new PrivilegeModel();
    privilege.Name = this.name;
    privilege.Description = this.description
    this.privilegeService.create(privilege).subscribe(data => {
      this.alertService.changeMessage({
        text: 'Tạo chức vụ thành công',
        color: 'green'
      });
      this.closeDialog();
    })
  }

}
