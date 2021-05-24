import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//model
import { EmployeeNoteModel } from "../../../../models/employee-note.model";

//service
import { AlertService } from "../../../../../../shared/services/alert.service";
import { EmployeeNoteService } from "../../../../services/employee-note.service";

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})

export class CreateNoteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateNoteComponent>,
    private employeeNoteService: EmployeeNoteService,
    private alerService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  noteTitle: string;
  noteContent: string;

  ngOnInit(): void {
  }

  createNote() {
    let note = new EmployeeNoteModel();
    note.NoteTitle = this.noteTitle;
    note.NoteContent = this.noteContent;
    this.employeeNoteService.create(note).subscribe(data => {
      this.alerService.changeMessage({
        text: 'Tạo ghi chú thành công',
        color: 'green'
      });
      this.closeDialog();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight)+"px";
  }
}
