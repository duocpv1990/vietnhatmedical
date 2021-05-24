import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMedicalScheduleComponent } from './detail-medical-schedule.component';

describe('DetailMedicalScheduleComponent', () => {
  let component: DetailMedicalScheduleComponent;
  let fixture: ComponentFixture<DetailMedicalScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMedicalScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMedicalScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
