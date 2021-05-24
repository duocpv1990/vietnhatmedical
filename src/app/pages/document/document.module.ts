import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//module
import { DocumentRoutingModule } from './document-routing.module';
import { SharedModule } from "../../shared/shared.module";
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';

//component
import { DocumentComponent } from '../document/document.component';
import { AddfileComponent } from './component/addfile/addfile.component';
import { FolderDetailComponent } from './component/folder-detail/folder-detail.component';
import { AddFolderComponent } from './component/add-folder/add-folder.component';
import { ShowfileComponent } from './component/showfile/showfile.component';
import { EditFolderComponent } from './component/edit-folder/edit-folder.component';
import { DelFolderComponent } from './component/del-folder/del-folder.component';


@NgModule({
  declarations: [DocumentComponent, AddfileComponent, FolderDetailComponent, AddFolderComponent, ShowfileComponent, EditFolderComponent, DelFolderComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    SharedModule
  ]
})
export class DocumentModule { }
