import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-customer-service-detail',
  templateUrl: './customer-service-detail.component.html',
  styleUrls: ['./customer-service-detail.component.scss']
})
export class CustomerServiceDetailComponent implements OnInit {

  @Input('currentService') currentService: any;

  constructor() { }

  ngOnInit(): void {
    console.log("Dich vu hien tai: ",this.currentService);
  }

}
