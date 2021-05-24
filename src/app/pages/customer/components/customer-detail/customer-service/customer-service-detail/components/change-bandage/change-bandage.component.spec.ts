import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBandageComponent } from './change-bandage.component';

describe('ChangeBandageComponent', () => {
  let component: ChangeBandageComponent;
  let fixture: ComponentFixture<ChangeBandageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeBandageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBandageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
