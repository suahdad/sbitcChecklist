import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ChecklistService } from './checklist.service';

describe('ChecklistService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule,
    ReactiveFormsModule]
  }));

  it('should be created', () => {
    const service: ChecklistService = TestBed.get(ChecklistService);
    expect(service).toBeTruthy();
  });
});
