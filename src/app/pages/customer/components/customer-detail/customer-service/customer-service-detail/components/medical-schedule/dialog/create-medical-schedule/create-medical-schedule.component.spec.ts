import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMedicalScheduleComponent } from './create-medical-schedule.component';

describe('CreateMedicalScheduleComponent', () => {
  let component: CreateMedicalScheduleComponent;
  let fixture: ComponentFixture<CreateMedicalScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMedicalScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMedicalScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
