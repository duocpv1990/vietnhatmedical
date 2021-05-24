import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorWorkListComponent } from './doctor-work-list.component';

describe('DoctorWorkListComponent', () => {
  let component: DoctorWorkListComponent;
  let fixture: ComponentFixture<DoctorWorkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorWorkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorWorkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
