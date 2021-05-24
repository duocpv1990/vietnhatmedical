import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//service
import { LoginService } from '../../services/login.service';
import { AlertService } from '../../../shared/services/alert.service';
import { PrivilegeService } from '../../../pages/setting/services/privilege.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CallCenterService } from 'src/app/pages/customer/services/call-center.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @HostListener('window:keydown.enter', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.login();
  }

  loginForm: FormGroup;
  hasError = false;
  userPrivilegeList = [];
  privilegeList = [];
  stringeeToken: string;
  stringeeRestApiToken: string;

  constructor(
    private loginService: LoginService,
    private alertService: AlertService,
    public privilegeService: PrivilegeService,
    private router: Router,
    private loaderService: LoaderService,
    private fb: FormBuilder,
    private callService: CallCenterService
  ) {
    this.loginForm = this.fb.group({
      grant_type: ['password'],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  getPrivilegeList() {
    this.privilegeService.getUserPrivilege().subscribe(data => {
      this.userPrivilegeList = data;
      this.userPrivilegeList.forEach(e => {
        this.privilegeList.push(e.APIURL + ',' + e.Method);
      });
      localStorage.setItem('access_privilegeList', JSON.stringify(this.privilegeList));
      this.router.navigateByUrl('/pages/home');
    });
  }



  login(): void {
    this.hasError = false;
    this.loginService.login(this.loginForm.value).subscribe(
      (data) => {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('access_user', JSON.stringify(data));
        localStorage.setItem('reload', JSON.stringify(true));
        this.getPrivilegeList();
      },

      (err) => {
        if (err.status === 400) this.hasError = true;
      })
  }

}
