import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, Input, AfterViewInit } from '@angular/core';

//service
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit, AfterViewInit {

  @Input() selectedIndex: number | null
  @ViewChild('myCustomer', { read: ViewContainerRef }) myCustomer: ViewContainerRef;
  @ViewChild('info', { read: ViewContainerRef }) info: ViewContainerRef;
  @ViewChild('calender', { read: ViewContainerRef }) calender: ViewContainerRef;
  @ViewChild('kpi', { read: ViewContainerRef }) kpi: ViewContainerRef;
  constructor(
    private cfr: ComponentFactoryResolver,
    public activatedRoute: ActivatedRoute,
    public employeeService: EmployeeService
  ) { }

  currentEmployee: any;
  currentEmployeeId: any;
  positions: any;
  employeeAvatarString: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => this.currentEmployeeId = +param.get('employeeId'));
    this.getCurrentEmployee();
  }

  ngAfterViewInit() {
    setTimeout(() => this.checkActiveTab());
  }
  
  // nhận thông tin nhân viên từ component con (employee-info)
  receiveMessage($event: object) {
    this.currentEmployee = $event;
  }

  checkActiveTab() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.selectedIndex = +params.get('tab');
      this.selectedIndex === 1 && this.loadMyCustomer();
      this.selectedIndex === 2 && this.loadCalender();
      this.selectedIndex === 3 && this.loadKpi();
    });
  }


  getCurrentEmployee() {
    this.employeeService.getAllEmployee(1).subscribe(data => {
      this.currentEmployee = data.find((employee: any) => employee.EmployeeId == this.currentEmployeeId);
    });
  }

  async loadMyCustomer() {
    this.myCustomer.clear();
    const { EmployeeCustomerComponent } = await import('./employee-customer/employee-customer.component');
    this.myCustomer.createComponent(
      this.cfr.resolveComponentFactory(EmployeeCustomerComponent)
    );
  }

  async loadCalender() {
    this.calender.clear();
    const { EmployeeCalenderComponent } = await import('./employee-calender/employee-calender.component');
    this.calender.createComponent(
      this.cfr.resolveComponentFactory(EmployeeCalenderComponent)
    );
  }

  async loadKpi() {
    this.kpi.clear();
    const { EmployeeKpiComponent } = await import('./employee-kpi/employee-kpi.component');
    this.kpi.createComponent(
      this.cfr.resolveComponentFactory(EmployeeKpiComponent)
    );
  }
}
