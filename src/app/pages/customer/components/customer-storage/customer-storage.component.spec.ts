import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerStorageComponent } from './customer-storage.component';

describe('CustomerStorageComponent', () => {
  let component: CustomerStorageComponent;
  let fixture: ComponentFixture<CustomerStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
