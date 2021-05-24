import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//model
import { EmployeeNoteModel } from "../../../../models/employee-note.model";

//service
import { AlertService } from "../../../../../../shared/services/alert.service";
import { EmployeeNoteService } from "../../../../services/employee-note.service";

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})

export class EditNoteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditNoteComponent>,
    private employeeNoteService: EmployeeNoteService,
    private alerService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  noteContent: string;
  noteTitle: string;

  ngOnInit(): void {
    this.noteContent = this.data.employeeNote.NoteContent;
    this.noteTitle = this.data.employeeNote.NoteTitle;
  }

  updateNote() {
    let note = new EmployeeNoteModel();
    note.NoteContent = this.noteContent;
    note.NoteTitle = this.noteTitle;
    this.employeeNoteService.update(note, this.data.employeeNote.EmployeeNoteId).subscribe(() => {
      this.alerService.changeMessage({
        text: 'Cập nhật ghi chú thành công',
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
