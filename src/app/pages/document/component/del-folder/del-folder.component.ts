import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FolderService } from '../../services/folder.service';

@Component({
  selector: 'app-del-folder',
  templateUrl: './del-folder.component.html',
  styleUrls: ['./del-folder.component.scss']
})
export class DelFolderComponent implements OnInit {
   
  constructor(
    public alertService: AlertService,
    public folderService : FolderService,
    public dialog: MatDialogRef<DelFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public dataID:any
  ) { }

  ngOnInit(): void {

    
  }



  delDocument(){
    this.folderService.delFolderFormDepartment(this.dataID.id).subscribe(()=> {
      setTimeout(() => {
        this.alertService.changeMessage({
            color: 'red',
            text: `Xóa Folder thành công!`
          }
        );
      }, 300);
      this.dialog.close();
      });
  }
  closeDialog(){
  this.dialog.close();
  }
}
