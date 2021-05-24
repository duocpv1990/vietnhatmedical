import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePrivilegeComponent } from './delete-privilege.component';

describe('DeletePrivilegeComponent', () => {
  let component: DeletePrivilegeComponent;
  let fixture: ComponentFixture<DeletePrivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePrivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
