import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerContractComponent } from './create-customer-contract.component';

describe('CreateCustomerContractComponent', () => {
  let component: CreateCustomerContractComponent;
  let fixture: ComponentFixture<CreateCustomerContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCustomerContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustomerContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
