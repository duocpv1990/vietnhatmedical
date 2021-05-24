import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerExamComponent } from './customer-exam.component';

describe('CustomerExamComponent', () => {
  let component: CustomerExamComponent;
  let fixture: ComponentFixture<CustomerExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
