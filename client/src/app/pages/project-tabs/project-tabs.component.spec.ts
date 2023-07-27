import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTabsComponent } from './project-tabs.component';

describe('ProjectTabsComponent', () => {
  let component: ProjectTabsComponent;
  let fixture: ComponentFixture<ProjectTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectTabsComponent]
    });
    fixture = TestBed.createComponent(ProjectTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
