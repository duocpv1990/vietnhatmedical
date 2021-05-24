import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractImagesDetailComponent } from './contract-images-detail.component';

describe('ContractImagesDetailComponent', () => {
  let component: ContractImagesDetailComponent;
  let fixture: ComponentFixture<ContractImagesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractImagesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractImagesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
