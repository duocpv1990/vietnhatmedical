import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInChargeComponent } from './person-in-charge.component';

describe('PersonInChargeComponent', () => {
  let component: PersonInChargeComponent;
  let fixture: ComponentFixture<PersonInChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonInChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonInChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
