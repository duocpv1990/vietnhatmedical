//Angular module
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';


//Angular material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
//component
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { LoaderComponent } from './components/loader/loader.component';
import { UserComponent } from './components/user/user.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SharedTableComponent } from './components/shared-table/shared-table.component';

//pipe
import { CustomPipeModule } from './pipe/pipe.module';
import { NoStraightBrick } from './pipe/pipe.custom';
import { PhoneNumberPipe } from './pipe/phone-number.pipe';

import { LogoutDialogComponent } from './components/user/logout-dialog/logout-dialog.component';

import { ChartsModule } from 'ng2-charts';
import { NotificationComponent } from './components/user/notification/notification.component';
import { NgMatTableQueryReflectorDirective } from './directives/ng-mat-table-query-reflector.directive';
import { FilterComponent } from './components/filter/filter.component';


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ",",
  precision: 0,
  prefix: "",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    MenuBarComponent,
    HeaderComponent,
    NotificationsComponent,
    LoaderComponent,
    UserComponent,
    DialogComponent,
    SharedTableComponent,
    LogoutDialogComponent,
    NotificationComponent,
    PhoneNumberPipe,
    NgMatTableQueryReflectorDirective,
    FilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule,
    FormsModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatToolbarModule,
    MatTableModule,
    ChartsModule,
    MatStepperModule,
    CurrencyMaskModule,
    MatListModule
  ],

  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MenuBarComponent,
    HeaderComponent,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatRadioModule,
    MatSelectModule,
    LoaderComponent,
    DialogComponent,
    SharedTableComponent,
    NotificationsComponent,
    UserComponent,
    MatTooltipModule,
    ChartsModule,
    MatStepperModule,
    CurrencyMaskModule,
    MatListModule,
    PhoneNumberPipe,
    NgMatTableQueryReflectorDirective
  ],
  providers: [CurrencyPipe, { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]

})
export class SharedModule { }
