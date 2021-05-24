import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//module
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from "../../shared/shared.module";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';

//Component
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomerInfoComponent } from './components/customer-detail/customer-info/customer-info.component';
import { CustomerContractComponent } from './components/customer-detail/customer-contract/customer-contract.component';
import { CustomerServiceComponent } from './components/customer-detail/customer-service/customer-service.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { DeleteCustomerComponent } from './components/customer-detail/dialog/delete-customer/delete-customer.component';
import { ScheduleBookingComponent } from './components/customer-detail/schedule-booking/schedule-booking.component';
import { CustomerConsultantNoteComponent } from './components/customer-detail/customer-consultant-note/customer-consultant-note.component';
import { CreateConsultantNoteComponent } from './components/customer-detail/customer-consultant-note/create-consultant-note/create-consultant-note.component';
import { CustomerExamComponent } from './components/customer-detail/customer-exam/customer-exam.component';
import { CreateCustomerExamComponent } from './components/customer-detail/dialog/create-customer-exam/create-customer-exam.component';
import { ConsultantNoteDetailComponent } from './components/customer-detail/dialog/consultant-note-detail/consultant-note-detail.component';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { CustomerExamDetailComponent } from './components/customer-detail/dialog/customer-exam-detail/customer-exam-detail.component';
import { PersonInChargeComponent } from './components/customer-detail/person-in-charge/person-in-charge.component';
import { CustomerHistoryComponent } from './components/customer-detail/customer-history/customer-history.component';
import { CreateCustomerContractComponent } from './components/customer-detail/customer-contract/create-customer-contract/create-customer-contract.component';
import { CustomerContractDetailComponent } from './components/customer-detail/customer-contract/customer-contract-detail/customer-contract-detail.component';
import { AssignCustomerComponent } from './components/customer-list/dialog/assign-customer/assign-customer.component';
import { CustomerHistoryDetailComponent } from './components/customer-detail/customer-history/customer-history-detail/customer-history-detail.component';
import { CustomerServiceDetailComponent } from './components/customer-detail/customer-service/customer-service-detail/customer-service-detail.component';
import { CreateContractPaymentComponent } from './components/customer-detail/dialog/create-contract-payment/create-contract-payment.component';
import { DeleteCustomerContractComponent } from './components/customer-detail/dialog/delete-customer-contract/delete-customer-contract.component';
import { SurgeryInfoComponent } from './components/customer-detail/customer-service/customer-service-detail/components/surgery-info/surgery-info.component';
import { ChangeBandageComponent } from './components/customer-detail/customer-service/customer-service-detail/components/change-bandage/change-bandage.component';
import { SurgeryResultComponent } from './components/customer-detail/customer-service/customer-service-detail/components/surgery-result/surgery-result.component';
import { PaymentInfoComponent } from './components/customer-detail/customer-service/customer-service-detail/components/payment-info/payment-info.component';
import { MedicalScheduleComponent } from './components/customer-detail/customer-service/customer-service-detail/components/medical-schedule/medical-schedule.component';
import { CreateMedicalScheduleComponent } from './components/customer-detail/customer-service/customer-service-detail/components/medical-schedule/dialog/create-medical-schedule/create-medical-schedule.component';
import { CreateChangeBandageComponent } from './components/customer-detail/customer-service/customer-service-detail/components/change-bandage/dialog/create-change-bandage/create-change-bandage.component';
import { SurgeryInfoDetailComponent } from './components/customer-detail/customer-service/customer-service-detail/components/surgery-info/dialog/surgery-info-detail/surgery-info-detail.component';
import { CreateSurgeryResultComponent } from './components/customer-detail/customer-service/customer-service-detail/components/surgery-result/dialog/create-surgery-result/create-surgery-result.component';
import { SurgeryResultDetailComponent } from './components/customer-detail/customer-service/customer-service-detail/components/surgery-result/dialog/surgery-result-detail/surgery-result-detail.component';
import { DetailChangeBandageComponent } from './components/customer-detail/customer-service/customer-service-detail/components/change-bandage/dialog/detail-change-bandage/detail-change-bandage.component';
import { DetailMedicalScheduleComponent } from './components/customer-detail/customer-service/customer-service-detail/components/medical-schedule/dialog/detail-medical-schedule/detail-medical-schedule.component';
import { CreateCustomerServiceComponent } from './components/customer-detail/customer-service/create-customer-service/create-customer-service.component';
import { ContractPaymentDetailComponent } from './components/customer-detail/dialog/contract-payment-detail/contract-payment-detail.component';
import { CallCustomerComponent } from './components/customer-detail/dialog/call-customer/call-customer.component';
import { CustomerContractImagesComponent } from './components/customer-detail/customer-contract-images/customer-contract-images.component';
import { CreateContractImagesComponent } from './components/customer-detail/dialog/create-contract-images/create-contract-images.component';
import { ContractImagesDetailComponent } from './components/customer-detail/dialog/contract-images-detail/contract-images-detail.component';
import { CallLogsComponent } from './components/customer-detail/call-logs/call-logs.component';
import { CustomerStorageComponent } from './components/customer-storage/customer-storage.component';
import { SalesComponent } from './components/customer-storage/sales/sales.component';
import { L8Component } from './components/customer-storage/l8/l8.component';
import { MarketingComponent } from './components/customer-storage/marketing/marketing.component';
import { UploadCustomerComponent } from '../customer/components/customer-list/dialog/upload-customer/upload-customer.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileUploadDetailComponent } from './components/file-upload/file-upload-detail/file-upload-detail.component';
import { SurgeryScheduleComponent } from './components/customer-detail/customer-service/customer-service-detail/components/surgery-info/dialog/surgery-schedule/surgery-schedule.component';
import { CustomPipeModule } from 'src/app/shared/pipe/pipe.module';
import { AdvisoryScheduleComponent } from './components/customer-detail/customer-service/customer-service-detail/components/advisory-schedule/advisory-schedule.component';
import { CreateAdvisoryScheduleComponent } from './components/customer-detail/customer-service/customer-service-detail/components/advisory-schedule/dialog/create-advisory-schedule/create-advisory-schedule.component';
import { DetailAdvisoryScheduleComponent } from './components/customer-detail/customer-service/customer-service-detail/components/advisory-schedule/dialog/detail-advisory-schedule/detail-advisory-schedule.component';
import { CallLogSaleComponent } from './components/customer-detail/call-logs/call-log-sale/call-log-sale.component';
import { CallLogCustomerCareComponent } from './components/customer-detail/call-logs/call-log-customer-care/call-log-customer-care.component';
import { CarecallscheduleComponent } from './components/customer-detail/customer-service/customer-service-detail/components/carecallschedule/carecallschedule.component';
import { CreateCarecallscheduleComponent } from './components/customer-detail/customer-service/customer-service-detail/components/carecallschedule/dialog/create-carecallschedule/create-carecallschedule.component';
import { DetailCarecallscheduleComponent } from './components/customer-detail/customer-service/customer-service-detail/components/carecallschedule/dialog/detail-carecallschedule/detail-carecallschedule.component';

const ENTRY_COMPONENT = [
  CustomerContractComponent,
  CustomerServiceComponent,
  DialogComponent
];

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerDetailComponent,
    CustomerInfoComponent,
    CustomerContractComponent,
    CustomerServiceComponent,
    CreateCustomerComponent,
    DeleteCustomerComponent,
    ScheduleBookingComponent,
    CustomerConsultantNoteComponent,
    CreateConsultantNoteComponent,
    CustomerExamComponent,
    CreateCustomerExamComponent,
    ConsultantNoteDetailComponent,
    CustomerExamDetailComponent,
    PersonInChargeComponent,
    CustomerHistoryComponent,
    CreateCustomerExamComponent,
    CreateCustomerContractComponent,
    CustomerContractDetailComponent,
    CustomerHistoryDetailComponent,
    CustomerServiceDetailComponent,
    AssignCustomerComponent,
    CustomerHistoryDetailComponent,
    CreateContractPaymentComponent,
    DeleteCustomerContractComponent,
    SurgeryInfoComponent,
    ChangeBandageComponent,
    SurgeryResultComponent,
    PaymentInfoComponent,
    MedicalScheduleComponent,
    CreateMedicalScheduleComponent,
    CreateChangeBandageComponent,
    SurgeryInfoDetailComponent,
    CreateSurgeryResultComponent,
    SurgeryResultDetailComponent,
    DetailChangeBandageComponent,
    DetailMedicalScheduleComponent,
    CreateCustomerServiceComponent,
    ContractPaymentDetailComponent,
    CallCustomerComponent,
    CustomerContractImagesComponent,
    CreateContractImagesComponent,
    ContractImagesDetailComponent,
    CallLogsComponent,
    CustomerStorageComponent,
    SalesComponent,
    L8Component,
    MarketingComponent,
    UploadCustomerComponent,
    FileUploadComponent,
    FileUploadDetailComponent,
    SurgeryScheduleComponent,
    AdvisoryScheduleComponent,
    CreateAdvisoryScheduleComponent,
    DetailAdvisoryScheduleComponent,
    CallLogSaleComponent,
    CallLogCustomerCareComponent,
    CarecallscheduleComponent,
    CreateCarecallscheduleComponent,
    DetailCarecallscheduleComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    SharedModule,
    CustomPipeModule,
    NgxPaginationModule
  ],
  entryComponents: [...ENTRY_COMPONENT],

  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CustomerModule { }
