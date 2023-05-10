import { TestBed } from '@angular/core/testing';

import { AadminAuthguardGuard } from './authguard.guard';

describe('AuthguardGuard', () => {
  let guard: AadminAuthguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AadminAuthguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
