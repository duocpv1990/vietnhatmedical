import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FolderModel } from '../../models/folder.model';
import { FolderService } from '../../services/folder.service';
import { DocumentModel } from '../../models/document.model';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-addfile',
  templateUrl: './addfile.component.html',
  styleUrls: ['./addfile.component.scss']

})
export class AddfileComponent implements OnInit {
  file: any;
  folderName: any;
  foldersId: number;
  Name: string;
  fileName: string;
  folders: object[];
  foldersName: any;
  Description: string;
  fileExtension: string;


  constructor(
    public folderService: FolderService,
    public alertService: AlertService,
    public dialogRef: MatDialogRef<AddfileComponent>,
    @Inject(MAT_DIALOG_DATA) public dataID: any,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getFolderFromDepartmentId(this.folders);

    }, 0);

  }

  processFile(file: File) {
    this.fileName = file[0].name;
    this.fileExtension = this.fileName.split('.')[1];
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = _event => {
      this.file = reader.result;
    };
  }

  getFolderFromDepartmentId(departmentId) {
    departmentId = this.dataID.id
    console.log(departmentId);

    this.folderService.getFolderFromDepartmentId(departmentId).subscribe(res => {
      this.folders = res;

      console.log(this.folders);

    })
  }

  //uploadFile
  changeClient(event) {
    this.foldersId = event
  }



  uploadFile() {
    let data = new DocumentModel();
    data.Name = this.Name;
    data.DepartmentfolderId = this.foldersId;
    data.Description = this.Description;
    data.ImageExtension = this.fileExtension;
    data.ImageUrl = this.file.split(',')[1];
    console.log(data);
    this.folderService.addDocumentFromDepartmentfolder(data).subscribe(res => {
      setTimeout(() => {
        this.alertService.changeMessage({
          color: 'green',
          text: `Thêm File thành công!`
        }
        );
      }, 300);
      this.dialogRef.close();
    });

  }

  // data.DepartmentfolderId = ;




}


