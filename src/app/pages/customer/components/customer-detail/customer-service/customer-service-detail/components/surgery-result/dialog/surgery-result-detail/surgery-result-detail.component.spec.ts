import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryResultDetailComponent } from './surgery-result-detail.component';

describe('SurgeryResultDetailComponent', () => {
  let component: SurgeryResultDetailComponent;
  let fixture: ComponentFixture<SurgeryResultDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryResultDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryResultDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
