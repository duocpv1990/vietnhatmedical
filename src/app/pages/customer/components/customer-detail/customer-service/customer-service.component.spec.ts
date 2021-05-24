import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceComponent } from './customer-service.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CustomerServiceComponent', () => {
  let component: CustomerServiceComponent;
  let fixture: ComponentFixture<CustomerServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerServiceComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
