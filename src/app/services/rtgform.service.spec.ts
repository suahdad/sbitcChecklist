import { TestBed } from '@angular/core/testing';

import { RtgformService } from './rtgform.service';

describe('RtgformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RtgformService = TestBed.get(RtgformService);
    expect(service).toBeTruthy();
  });
});
