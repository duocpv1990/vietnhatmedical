import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//component
import { HomeRoutingModule } from './home-routing.module';
import { WorkListComponent } from './components/work-list/work-list.component';
import { NoteComponent } from './components/note/note.component';
import { HomeComponent } from './home.component';
import { KpiComponent } from './components/kpi/kpi.component';

//module
import { MatMenuModule } from '@angular/material/menu';
import { CreateNoteComponent } from './components/note/dialog/create-note/create-note.component';
import { SharedModule } from "../../shared/shared.module";
import { EditNoteComponent } from './components/note/dialog/edit-note/edit-note.component';
import { DeleteComponent } from './components/note/dialog/delete/delete.component';
import { DoctorWorkListComponent } from './components/doctor-work-list/doctor-work-list.component';
import { ReceptionistCalendarComponent } from './components/work-list/receptionist-calendar/receptionist-calendar.component';
import { CustomerCareComponent } from './components/work-list/customer-care/customer-care.component';

@NgModule({
  declarations: [WorkListComponent, NoteComponent, HomeComponent, KpiComponent, CreateNoteComponent, EditNoteComponent, DeleteComponent, DoctorWorkListComponent, ReceptionistCalendarComponent, CustomerCareComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatMenuModule,
    SharedModule    
  ]
  
})
export class HomeModule { }
