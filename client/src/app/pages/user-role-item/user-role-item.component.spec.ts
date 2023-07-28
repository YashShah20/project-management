import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleItemComponent } from './user-role-item.component';

describe('UserRoleItemComponent', () => {
  let component: UserRoleItemComponent;
  let fixture: ComponentFixture<UserRoleItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRoleItemComponent]
    });
    fixture = TestBed.createComponent(UserRoleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
