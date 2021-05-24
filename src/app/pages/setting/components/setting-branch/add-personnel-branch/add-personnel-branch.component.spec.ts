import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonnelBranchComponent } from './add-personnel-branch.component';

describe('AddPersonnelBranchComponent', () => {
  let component: AddPersonnelBranchComponent;
  let fixture: ComponentFixture<AddPersonnelBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPersonnelBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonnelBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
