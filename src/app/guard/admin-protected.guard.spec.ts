import { TestBed } from '@angular/core/testing';

import { AdminProtectedGuard } from './admin-protected.guard';

describe('AdminProtectedGuard', () => {
  let guard: AdminProtectedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminProtectedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
