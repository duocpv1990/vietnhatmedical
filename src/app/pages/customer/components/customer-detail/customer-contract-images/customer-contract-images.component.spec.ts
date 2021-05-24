import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractImagesComponent } from './customer-contract-images.component';

describe('CustomerContractImagesComponent', () => {
  let component: CustomerContractImagesComponent;
  let fixture: ComponentFixture<CustomerContractImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerContractImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContractImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
