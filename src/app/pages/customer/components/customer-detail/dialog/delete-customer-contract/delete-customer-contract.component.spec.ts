import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCustomerContractComponent } from './delete-customer-contract.component';

describe('DeleteCustomerContractComponent', () => {
  let component: DeleteCustomerContractComponent;
  let fixture: ComponentFixture<DeleteCustomerContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCustomerContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCustomerContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
