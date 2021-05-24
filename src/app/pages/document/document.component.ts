import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AlertService } from 'src/app/shared/services/alert.service';
import { AddFolderComponent } from './component/add-folder/add-folder.component';
import { AddfileComponent } from './component/addfile/addfile.component';
import { DelFolderComponent } from './component/del-folder/del-folder.component';
import { EditFolderComponent } from './component/edit-folder/edit-folder.component';
import { ShowfileComponent } from './component/showfile/showfile.component';
import { DocumentService } from './services/document.service';
import { FolderService } from './services/folder.service';
import { FolderModel } from './models/folder.model';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  selected: number;
  derpartments: any;
  folders: object[];
  deparmentId : number;
  nameFolders: any;
 

  isShow: boolean = true;
  accessUser: any;
  positionId: number;
  position: string;
  employeeId: number;


  myFolder =  new FolderModel();

  constructor(public dialog: MatDialog,
    private folderService: FolderService,
    private doccumentService: DocumentService,
    public alertService: AlertService,) {

      this.accessUser = JSON.parse(localStorage.getItem('access_user'));
      this.employeeId = +this.accessUser.EmployeeId;
      this.position = this.accessUser.PositionName;
     }

  ngOnInit(): void {
    this.getDerpartments();
    this.getMyDocument();

 if(this.position.toLowerCase() === "admin") {
      this.isShow = true;  
 } else {
   this.isShow = false
 }
    console.log('position', this.isShow);
  }
  showSelected(id: number) {
    this.selected = id;
  }
  getDerpartments() {
    this.folderService.getDepartment().subscribe(data => {
      this.derpartments = data;
      this.getFolderFromDepartmentId(this.derpartments[0].DepartmentId);
    })
  }
  getFolderFromDepartmentId(departmentId) {
    this.selected = departmentId;
    this.folderService.getFolderFromDepartmentId(departmentId).subscribe(res => {
      this.folders = res;
   
      
    })
  }
  addFolder( id : number){
      this.deparmentId = id;
      this.dialog
      .open(AddFolderComponent, {
        data: {
          id :id,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.getFolderFromDepartmentId(this.deparmentId)
      });
  }
  // show list file in folder
  showListFileInFolder(DepartmentfolderId : number) {
    this.dialog
    .open(ShowfileComponent, {
      data: {
        id: DepartmentfolderId
      },
    })
    .afterClosed()
    .subscribe(() => {
    });
  }
    // upload file
  uploadFile( DepartmentId : number ) {
      this.dialog
        .open(AddfileComponent, {
          data: {
            id: DepartmentId,
          },
        })
        .afterClosed()
        .subscribe(() => {
  
        });
  
  }
  delFolder(DepartmentfolderId : number ){
        this.dialog
        .open(DelFolderComponent, {
          data: {
            id :DepartmentfolderId,
        
          },
        })
        .afterClosed()
        .subscribe(() => {
          this.getDerpartments();
        });
  }
  editFolder(DepartmentfolderId : number) {
      this.dialog
      .open(EditFolderComponent, {
        data: {
          id :DepartmentfolderId,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.getDerpartments();
      });
  }

   //Xem danh sách thư mục trong phòng ban của tôi 
   getMyDocument() {
     this.folderService.getFolderMyDepartment().subscribe(res => {
       this.myFolder = res;
       console.log(this.myFolder, "phong kinh doanh");
       
     })
   }
}
