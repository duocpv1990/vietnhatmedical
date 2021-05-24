import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-base',
  template: 'NO UI TO BE FOUND HERE!',
  styleUrls: []
})
export class BaseComponent implements OnInit {

  constructor(public router: Router,
  ) { }

  async checkToken() {
    let token = localStorage.getItem('access_token');
    if (!token) this.router.navigate(['/login']);
  }

   checkAccess(url: any) {
    let privilegeList = JSON.parse(localStorage.getItem('access_privilegeList'));
    if(privilegeList) return privilegeList.includes(url);
    else console.log('loi acccess');
  }
  
  ngOnInit() {

  }

}
