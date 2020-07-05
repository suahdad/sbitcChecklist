import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TractorComponent } from './tractor.component';

describe('TractorComponent', () => {
  let component: TractorComponent;
  let fixture: ComponentFixture<TractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
