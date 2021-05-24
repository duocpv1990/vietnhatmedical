import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerConsultantNoteComponent } from './customer-consultant-note.component';

describe('CustomerConsultantNoteComponent', () => {
  let component: CustomerConsultantNoteComponent;
  let fixture: ComponentFixture<CustomerConsultantNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerConsultantNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerConsultantNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
