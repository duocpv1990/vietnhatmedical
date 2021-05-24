import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PositionService } from 'src/app/pages/setting/services/position.service';
import { AlertService } from 'src/app/shared/services/alert.service';



@Component({
  selector: 'app-delete-position',
  templateUrl: './delete-position.component.html',
  styleUrls: ['./delete-position.component.scss']
})
export class DeletePositionComponent implements OnInit {

  constructor(
    private positionService: PositionService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<DeletePositionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data.positionId);

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deletePosition() {
    this.positionService.delete(this.data.positionId).subscribe(res => {
      this.alertService.changeMessage({
        text: 'Xóa chức vụ thành công',
        color: 'green'
      });
      this.closeDialog();
    })
  }

}
