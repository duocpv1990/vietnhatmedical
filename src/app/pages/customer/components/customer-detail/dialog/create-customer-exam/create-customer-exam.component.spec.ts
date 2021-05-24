import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerExamComponent } from './create-customer-exam.component';

describe('CreateCustomerExamComponent', () => {
  let component: CreateCustomerExamComponent;
  let fixture: ComponentFixture<CreateCustomerExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCustomerExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustomerExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
