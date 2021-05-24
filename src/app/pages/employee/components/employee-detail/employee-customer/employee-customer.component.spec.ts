import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCustomerComponent } from './employee-customer.component';

describe('EmployeeCustomerComponent', () => {
  let component: EmployeeCustomerComponent;
  let fixture: ComponentFixture<EmployeeCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
