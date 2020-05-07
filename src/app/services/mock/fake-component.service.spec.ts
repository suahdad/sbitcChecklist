import { TestBed } from '@angular/core/testing';

import { ComponentService } from './fake-component.service';

describe('FakeComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentService = TestBed.get(ComponentService);
    expect(service).toBeTruthy();
  });
});
