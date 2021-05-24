import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdvisoryScheduleComponent } from './create-advisory-schedule.component';

describe('CreateAdvisoryScheduleComponent', () => {
  let component: CreateAdvisoryScheduleComponent;
  let fixture: ComponentFixture<CreateAdvisoryScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdvisoryScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdvisoryScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
