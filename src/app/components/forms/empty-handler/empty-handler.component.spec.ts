import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyHandlerComponent } from './empty-handler.component';

describe('EmptyHandlerComponent', () => {
  let component: EmptyHandlerComponent;
  let fixture: ComponentFixture<EmptyHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
