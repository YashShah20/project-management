import { TestBed } from '@angular/core/testing';

import { DummyProjectManagementService } from './dummy-project-management.service';

describe('DummyProjectManagementService', () => {
  let service: DummyProjectManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyProjectManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
