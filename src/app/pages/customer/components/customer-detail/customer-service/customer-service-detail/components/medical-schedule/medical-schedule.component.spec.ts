import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalScheduleComponent } from './medical-schedule.component';

describe('MedicalScheduleComponent', () => {
  let component: MedicalScheduleComponent;
  let fixture: ComponentFixture<MedicalScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
