import { TestBed } from '@angular/core/testing';

import { QuestionService } from './fake-question.service';

describe('QuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({

  }));

  xit('should be created', () => {
    const service: QuestionService = TestBed.get(QuestionService);
    expect(service).toBeTruthy();
  });
});
