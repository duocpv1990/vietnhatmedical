import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractImagesComponent } from './create-contract-images.component';

describe('CreateContractImagesComponent', () => {
  let component: CreateContractImagesComponent;
  let fixture: ComponentFixture<CreateContractImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContractImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContractImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
