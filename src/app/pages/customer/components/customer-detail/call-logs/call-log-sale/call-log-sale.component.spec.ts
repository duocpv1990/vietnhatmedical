import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLogSaleComponent } from './call-log-sale.component';

describe('CallLogSaleComponent', () => {
  let component: CallLogSaleComponent;
  let fixture: ComponentFixture<CallLogSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallLogSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallLogSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
