import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FolderModel } from '../../models/folder.model';
import { FolderService } from '../../services/folder.service';

@Component({
  selector: 'app-edit-folder',
  templateUrl: './edit-folder.component.html',
  styleUrls: ['./edit-folder.component.scss']
})
export class EditFolderComponent implements OnInit {
  nameFolder : string;
  constructor(
    public alertService: AlertService,
    public folderService : FolderService,
    public dialog: MatDialogRef<EditFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public dataID:any
  ) { }

  ngOnInit(): void {
    console.log(this.dataID.id);
    

  }
  creatDocument(){
    let data = new FolderModel();
    data.Name = this.nameFolder;
    data.DepartmentfolderId = this.dataID.id;
      this.folderService.update(data,this.dataID.id).subscribe(() => {
      setTimeout(() => {
        this.alertService.changeMessage({
            color: 'green',
            text: `Sửa Folder thành công!`
          }
        );
      }, 300);
      this.dialog.close();
      
      });
  }
  closeDialog() {
    this.dialog.close();
  }
}
