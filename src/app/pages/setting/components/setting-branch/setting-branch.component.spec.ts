import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingBranchComponent } from './setting-branch.component';

describe('SettingBranchComponent', () => {
  let component: SettingBranchComponent;
  let fixture: ComponentFixture<SettingBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
