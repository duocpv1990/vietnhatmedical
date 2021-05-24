import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelFolderComponent } from './del-folder.component';

describe('DelFolderComponent', () => {
  let component: DelFolderComponent;
  let fixture: ComponentFixture<DelFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
