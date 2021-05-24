import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractDetailComponent } from './customer-contract-detail.component';

describe('CustomerContractDetailComponent', () => {
  let component: CustomerContractDetailComponent;
  let fixture: ComponentFixture<CustomerContractDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerContractDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContractDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
