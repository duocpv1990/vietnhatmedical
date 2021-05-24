import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//shared
import { SharedModule } from '../app/shared/shared.module';
import { CurrencyMaskModule } from "ng2-currency-mask";
//interceptor
import { LoaderService } from './shared/services/loader.service';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { APIInterceptor } from './shared/interceptors/api.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CurrencyMaskModule
  ],
  providers: [
    LoaderService,
    AuthGuard,
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
