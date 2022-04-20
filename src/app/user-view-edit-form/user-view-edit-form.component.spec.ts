import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewEditFormComponent } from './user-view-edit-form.component';

describe('UserViewEditFormComponent', () => {
  let component: UserViewEditFormComponent;
  let fixture: ComponentFixture<UserViewEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
