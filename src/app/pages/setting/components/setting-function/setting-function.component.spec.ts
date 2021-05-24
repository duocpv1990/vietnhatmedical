import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingFunctionComponent } from './setting-function.component';

describe('SettingFunctionComponent', () => {
  let component: SettingFunctionComponent;
  let fixture: ComponentFixture<SettingFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
