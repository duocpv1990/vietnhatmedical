import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryInfoDetailComponent } from './surgery-info-detail.component';

describe('SurgeryInfoDetailComponent', () => {
  let component: SurgeryInfoDetailComponent;
  let fixture: ComponentFixture<SurgeryInfoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryInfoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryInfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
