import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { L8Component } from './l8.component';

describe('L8Component', () => {
  let component: L8Component;
  let fixture: ComponentFixture<L8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ L8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(L8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
