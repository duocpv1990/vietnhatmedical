import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConsultantNoteComponent } from './create-consultant-note.component';

describe('CreateConsultantNoteComponent', () => {
  let component: CreateConsultantNoteComponent;
  let fixture: ComponentFixture<CreateConsultantNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateConsultantNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConsultantNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
