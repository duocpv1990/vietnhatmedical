import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FolderModel } from '../../models/folder.model';
import { FolderService } from '../../services/folder.service';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss']
})
export class AddFolderComponent implements OnInit {
    nameFolder : string;
  constructor(  
    public alertService: AlertService,
    public dialogRef: MatDialogRef<AddFolderComponent>,

    public folderService : FolderService,
    public dialog: MatDialogRef<AddFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public dataID: any
    
    ) { }

  ngOnInit(): void {
    
    
  }
  creatDocument(){
    let data = new FolderModel();
    data.Name = this.nameFolder;
    data.DepartmentId  = this.dataID.id;
   
      this.folderService.addFolderFromDepartmentId(data).subscribe(res => {
       
      setTimeout(() => {
        this.alertService.changeMessage({
            color: 'green',
            text: `Tạo Folder thành công!`
          }
        );
      }, 300);
      this.dialogRef.close();
      });
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
