import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//component 
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


const routes: Routes = [
  {
    path : '',
    component : LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
