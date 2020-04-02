import { TestBed } from '@angular/core/testing';

import { RemarksService } from './remarks.service';

describe('RemarksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemarksService = TestBed.get(RemarksService);
    expect(service).toBeTruthy();
  });
});
