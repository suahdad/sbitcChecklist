import { TestBed } from '@angular/core/testing';
import { IssuesService } from './fake-issues.service';

describe('FakeIssuesService', () => {
  let service: IssuesService
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssuesService]
    })
  service = TestBed.get(IssuesService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getIssues() should return some values', () => {
    service.getIssues().subscribe(data => 
      expect(data.length).toBeGreaterThanOrEqual(1))
  });
});
