import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FolderService } from '../../services/folder.service';

@Component({
  selector: 'app-showfile',
  templateUrl: './showfile.component.html',
  styleUrls: ['./showfile.component.scss']
})
export class ShowfileComponent implements OnInit {
  showFileName:object[];
 
  constructor(
    public dialog: MatDialogRef<ShowfileComponent>,
    public folderService : FolderService,
    public alertService: AlertService,

    @Inject(MAT_DIALOG_DATA) public dataID: any
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showListfileDepartmentfolder()
    
    }, 0);
 
   
    
  }
  closeDialog() {
    this.dialog.close();
  }

delFile( DepartmentfolderImageId : number ) {
    console.log(DepartmentfolderImageId);
    this.folderService.delFileFromDeparmentfolder(DepartmentfolderImageId).subscribe( res => {
      setTimeout(() => {
        this.alertService.changeMessage({
            color: 'green',
            text: `Xóa file thành công!`
          }
        );
      }, 300);
      // this.dialog.close();
      this.showListfileDepartmentfolder();

      });
  }
showListfileDepartmentfolder() {
  let DepartmentfolderId = this.dataID.id
  this.folderService.getListFileFromDeparmentfolder(DepartmentfolderId).subscribe(res => {
    this.showFileName = res;
    console.log(this.showFileName,"list data");
    
  })
}

}
