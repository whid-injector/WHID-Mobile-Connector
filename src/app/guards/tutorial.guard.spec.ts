import { TestBed, async, inject } from '@angular/core/testing';

import { TutorialGuard } from './tutorial.guard';

describe('TutorialGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TutorialGuard]
    });
  });

  it('should ...', inject([TutorialGuard], (guard: TutorialGuard) => {
    expect(guard).toBeTruthy();
  }));
});
