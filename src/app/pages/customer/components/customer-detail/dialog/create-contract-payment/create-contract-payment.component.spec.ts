import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractPaymentComponent } from './create-contract-payment.component';

describe('CreateContractPaymentComponent', () => {
  let component: CreateContractPaymentComponent;
  let fixture: ComponentFixture<CreateContractPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContractPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContractPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
