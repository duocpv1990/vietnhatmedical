import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareScheduleComponent } from './care-schedule.component';

describe('CareScheduleComponent', () => {
  let component: CareScheduleComponent;
  let fixture: ComponentFixture<CareScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
