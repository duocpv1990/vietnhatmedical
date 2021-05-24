import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCarecallscheduleComponent } from './detail-carecallschedule.component';

describe('DetailCarecallscheduleComponent', () => {
  let component: DetailCarecallscheduleComponent;
  let fixture: ComponentFixture<DetailCarecallscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCarecallscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCarecallscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
