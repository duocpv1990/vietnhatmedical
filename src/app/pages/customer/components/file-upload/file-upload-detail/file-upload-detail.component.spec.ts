import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadDetailComponent } from './file-upload-detail.component';

describe('FileUploadDetailComponent', () => {
  let component: FileUploadDetailComponent;
  let fixture: ComponentFixture<FileUploadDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
