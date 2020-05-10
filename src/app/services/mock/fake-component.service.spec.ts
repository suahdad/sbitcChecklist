import { TestBed } from '@angular/core/testing';
import { ComponentService } from './fake-component.service';
import { doesNotThrow } from 'assert';

describe('FakeComponentService', () => {
  let service: ComponentService

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [ComponentService]
    })

    service = TestBed.get(ComponentService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getComponent() should return some values', () => {
    service.getComponent().subscribe(data =>
      {
        expect(data.length).toBeGreaterThanOrEqual(1)
      })      
  })
});
