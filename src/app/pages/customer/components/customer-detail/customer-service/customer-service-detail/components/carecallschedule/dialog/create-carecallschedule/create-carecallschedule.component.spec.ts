import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarecallscheduleComponent } from './create-carecallschedule.component';

describe('CreateCarecallscheduleComponent', () => {
  let component: CreateCarecallscheduleComponent;
  let fixture: ComponentFixture<CreateCarecallscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCarecallscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCarecallscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
