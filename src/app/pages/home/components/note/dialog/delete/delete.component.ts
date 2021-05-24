import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//model
import { EmployeeNoteModel } from "../../../../models/employee-note.model";

//service
import { AlertService } from "../../../../../../shared/services/alert.service";
import { EmployeeNoteService } from "../../../../services/employee-note.service";
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    private employeeNoteService: EmployeeNoteService,
    private alerService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  deleteNote(){
    this.employeeNoteService.delete(this.data.employeeNote.EmployeeNoteId).subscribe(() => {
      this.alerService.changeMessage({
        color: 'green',
        text: `Xóa ghi chú thành công`
      });
    });
    this.closeDialog();
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
