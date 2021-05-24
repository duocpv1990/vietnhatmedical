import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarecallscheduleComponent } from './carecallschedule.component';

describe('CarecallscheduleComponent', () => {
  let component: CarecallscheduleComponent;
  let fixture: ComponentFixture<CarecallscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarecallscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarecallscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
