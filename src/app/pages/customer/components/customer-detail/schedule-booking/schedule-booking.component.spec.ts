import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleBookingComponent } from './schedule-booking.component';

describe('ScheduleBookingComponent', () => {
  let component: ScheduleBookingComponent;
  let fixture: ComponentFixture<ScheduleBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
