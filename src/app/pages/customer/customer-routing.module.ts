import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//component
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDetailComponent } from "./components/customer-detail/customer-detail.component";
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { CustomerStorageComponent } from './components/customer-storage/customer-storage.component';
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { FileUploadDetailComponent } from "./components/file-upload/file-upload-detail/file-upload-detail.component";

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  },
  {
    path: 'create',
    component: CreateCustomerComponent
  },
  {
    path: 'storage',
    component: CustomerStorageComponent
  },
  {
    path: 'file-upload',
    component: FileUploadComponent
  },
  {
    path: 'file-upload/:fileId',
    component: FileUploadDetailComponent
  },
  {
    path: ':customerId',
    component: CustomerDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
