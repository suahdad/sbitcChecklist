import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ComponentService } from './component.service';

describe('ComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: ComponentService = TestBed.get(ComponentService);
    expect(service).toBeTruthy();
  });
});
