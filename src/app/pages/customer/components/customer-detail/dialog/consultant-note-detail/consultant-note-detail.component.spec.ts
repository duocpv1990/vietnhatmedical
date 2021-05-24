import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantNoteDetailComponent } from './consultant-note-detail.component';

describe('ConsultantNoteDetailComponent', () => {
  let component: ConsultantNoteDetailComponent;
  let fixture: ComponentFixture<ConsultantNoteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantNoteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantNoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
