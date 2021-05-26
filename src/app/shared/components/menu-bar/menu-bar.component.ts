import { Component, OnInit, DoCheck } from '@angular/core';

import { menuItem } from './menu-item';
import { BaseComponent } from '../base.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent extends BaseComponent implements OnInit, DoCheck {
    splitedUrl: Array<string>;
    menuItem: any;

    constructor(
        public router: Router
    ) {
        super(router);
        // menuItem[1].isAccess = this.checkAccess('api/customer/username,GET');
        // menuItem[2].isAccess = this.checkAccess('api/schedule,GET');
        // menuItem[4].isAccess = this.checkAccess('api/position,GET');
        // menuItem[5].isAccess = this.checkAccess('api/employee,GET');
        // menuItem[6].isAccess = this.checkAccess('api/role,GET');
        this.menuItem = menuItem;
    }

    ngOnInit(): void {
        this.splitedUrl = window.location.href.split('/');
    }

    ngDoCheck() {
        this.splitedUrl = window.location.href.split('/');
    }
}
