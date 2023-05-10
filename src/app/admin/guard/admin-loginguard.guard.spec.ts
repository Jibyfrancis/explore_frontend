import { TestBed } from '@angular/core/testing';

import { AdminLoginguardGuard } from './admin-loginguard.guard';

describe('AdminLoginguardGuard', () => {
  let guard: AdminLoginguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminLoginguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
