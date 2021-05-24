import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowfileComponent } from './showfile.component';

describe('ShowfileComponent', () => {
  let component: ShowfileComponent;
  let fixture: ComponentFixture<ShowfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
