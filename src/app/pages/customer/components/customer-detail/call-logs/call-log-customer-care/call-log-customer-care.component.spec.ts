import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLogCustomerCareComponent } from './call-log-customer-care.component';

describe('CallLogCustomerCareComponent', () => {
  let component: CallLogCustomerCareComponent;
  let fixture: ComponentFixture<CallLogCustomerCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallLogCustomerCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallLogCustomerCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
