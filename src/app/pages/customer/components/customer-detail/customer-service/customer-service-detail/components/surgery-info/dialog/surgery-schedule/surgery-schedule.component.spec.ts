import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryScheduleComponent } from './surgery-schedule.component';

describe('SurgeryScheduleComponent', () => {
  let component: SurgeryScheduleComponent;
  let fixture: ComponentFixture<SurgeryScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
