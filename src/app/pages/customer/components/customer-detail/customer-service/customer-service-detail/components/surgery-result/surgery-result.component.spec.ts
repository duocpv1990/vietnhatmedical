import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryResultComponent } from './surgery-result.component';

describe('SurgeryResultComponent', () => {
  let component: SurgeryResultComponent;
  let fixture: ComponentFixture<SurgeryResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
