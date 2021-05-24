import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChangeBandageComponent } from './create-change-bandage.component';

describe('CreateChangeBandageComponent', () => {
  let component: CreateChangeBandageComponent;
  let fixture: ComponentFixture<CreateChangeBandageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChangeBandageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChangeBandageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
