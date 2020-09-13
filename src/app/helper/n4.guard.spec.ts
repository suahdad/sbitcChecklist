import { TestBed, async, inject } from '@angular/core/testing';

import { N4Guard } from './n4.guard';

describe('N4Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [N4Guard]
    });
  });

  it('should ...', inject([N4Guard], (guard: N4Guard) => {
    expect(guard).toBeTruthy();
  }));
});
