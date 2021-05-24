import { Component, OnInit, ViewChild, AfterViewInit, Input, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-call-logs',
  templateUrl: './call-logs.component.html',
  styleUrls: ['./call-logs.component.scss']
})
export class CallLogsComponent implements OnInit, AfterViewInit {
  @Input() selectedIndex: number | null;
  @ViewChild('customerCare', { read: ViewContainerRef }) customerCare: ViewContainerRef;

  isShow: number;
  position = JSON.parse(localStorage.getItem('access_user')).PositionName;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cfr: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {

    switch (this.position.toLowerCase()) {
      case 'sale':
        this.isShow = 1;
        break;
      case 'cskh':
        this.isShow = 2;
        break;
      default:
        this.isShow = 3;
    }


  }

  ngAfterViewInit() {
    // setTimeout(() => this.checkActiveTab());
  }

  // checkActiveTab() {
  //   this.activatedRoute.queryParamMap.subscribe(params => {
  //     this.selectedIndex = +params.get('tab');
  //     this.selectedIndex === 1 && this.loadCustomerCareCallLog();

  //   });
  // }

  async loadCustomerCareCallLog() {
    this.customerCare.clear();
    const { CallLogCustomerCareComponent } = await import('./call-log-customer-care/call-log-customer-care.component');
    this.customerCare.createComponent(
      this.cfr.resolveComponentFactory(CallLogCustomerCareComponent)
    );
  }



}
