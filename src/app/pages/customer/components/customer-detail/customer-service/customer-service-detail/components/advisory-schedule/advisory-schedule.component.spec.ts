import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisoryScheduleComponent } from './advisory-schedule.component';

describe('AdvisoryScheduleComponent', () => {
  let component: AdvisoryScheduleComponent;
  let fixture: ComponentFixture<AdvisoryScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisoryScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisoryScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
