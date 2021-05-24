import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCalenderComponent } from './employee-calender.component';

describe('EmployeeCalenderComponent', () => {
  let component: EmployeeCalenderComponent;
  let fixture: ComponentFixture<EmployeeCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
