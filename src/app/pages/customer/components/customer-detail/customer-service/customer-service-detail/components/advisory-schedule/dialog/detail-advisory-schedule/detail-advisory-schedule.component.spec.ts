import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAdvisoryScheduleComponent } from './detail-advisory-schedule.component';

describe('DetailAdvisoryScheduleComponent', () => {
  let component: DetailAdvisoryScheduleComponent;
  let fixture: ComponentFixture<DetailAdvisoryScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAdvisoryScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAdvisoryScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
