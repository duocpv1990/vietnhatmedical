import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerServiceComponent } from './create-customer-service.component';

describe('CreateCustomerServiceComponent', () => {
  let component: CreateCustomerServiceComponent;
  let fixture: ComponentFixture<CreateCustomerServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCustomerServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustomerServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
