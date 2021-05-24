import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

//service
import { EmployeeNoteService } from '../../services/employee-note.service';
import { AlertService} from '../../../../shared/services/alert.service'

//component
import { CreateNoteComponent } from "./dialog/create-note/create-note.component";
import { EditNoteComponent } from "./dialog/edit-note/edit-note.component";
import { DeleteComponent } from './dialog/delete/delete.component';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private employeeNoteService: EmployeeNoteService,
    private alertService: AlertService
  ) { }

  employeeNoteList: any;
  employeeNoteId: number;

  ngOnInit(): void {
    this.getListNote();
  }

  getListNote() {
    this.employeeNoteService.listByToken().subscribe(data => {
      this.employeeNoteList = data.reverse();
      // console.log(data);
    });
  } 

  openDeleteForm(employeeNoteId : number) {
    this.dialog.open(DeleteComponent, {
      data: {
        employeeNote: this.employeeNoteList.find(employeeNote => employeeNote.EmployeeNoteId == employeeNoteId),
      }
    }).afterClosed().subscribe(() => {
      this.getListNote();
    });
  }
 
  openEditForm(employeeNoteId : number) {
    this.dialog.open(EditNoteComponent, {
      data: {
        employeeNote: this.employeeNoteList.find(employeeNote => employeeNote.EmployeeNoteId == employeeNoteId),
      }
    }).afterClosed().subscribe(() => {
      this.getListNote();
    });
  }

  openCreateForm() {
    this.dialog.open(CreateNoteComponent, {
      data: {
        
      }
    }).afterClosed().subscribe(() => {
      this.getListNote();
    });
  }

}
