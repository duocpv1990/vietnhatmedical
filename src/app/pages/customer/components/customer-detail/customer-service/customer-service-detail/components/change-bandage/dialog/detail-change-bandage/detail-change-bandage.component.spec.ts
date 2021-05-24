import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailChangeBandageComponent } from './detail-change-bandage.component';

describe('DetailChangeBandageComponent', () => {
  let component: DetailChangeBandageComponent;
  let fixture: ComponentFixture<DetailChangeBandageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailChangeBandageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailChangeBandageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
