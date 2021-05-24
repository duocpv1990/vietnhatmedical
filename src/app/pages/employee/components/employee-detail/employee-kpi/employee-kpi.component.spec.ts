import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeKpiComponent } from './employee-kpi.component';

describe('EmployeeKpiComponent', () => {
  let component: EmployeeKpiComponent;
  let fixture: ComponentFixture<EmployeeKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
