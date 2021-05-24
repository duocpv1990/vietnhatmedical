import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerExamDetailComponent } from './customer-exam-detail.component';

describe('CustomerExamDetailComponent', () => {
  let component: CustomerExamDetailComponent;
  let fixture: ComponentFixture<CustomerExamDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerExamDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerExamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
