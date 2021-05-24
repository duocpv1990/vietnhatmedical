import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryInfoComponent } from './surgery-info.component';

describe('SurgeryInfoComponent', () => {
  let component: SurgeryInfoComponent;
  let fixture: ComponentFixture<SurgeryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
