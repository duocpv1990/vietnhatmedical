import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSurgeryResultComponent } from './create-surgery-result.component';

describe('CreateSurgeryResultComponent', () => {
  let component: CreateSurgeryResultComponent;
  let fixture: ComponentFixture<CreateSurgeryResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSurgeryResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSurgeryResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
