import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHistoryDetailComponent } from './customer-history-detail.component';

describe('CustomerHistoryDetailComponent', () => {
  let component: CustomerHistoryDetailComponent;
  let fixture: ComponentFixture<CustomerHistoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerHistoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
