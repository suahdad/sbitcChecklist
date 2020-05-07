import { TestBed } from '@angular/core/testing';

import { IssuesService } from './fake-issues.service';

describe('FakeIssuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssuesService = TestBed.get(IssuesService);
    expect(service).toBeTruthy();
  });
});
