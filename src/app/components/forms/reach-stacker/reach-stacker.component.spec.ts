import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReachStackerComponent } from './reach-stacker.component';

describe('ReachStackerComponent', () => {
  let component: ReachStackerComponent;
  let fixture: ComponentFixture<ReachStackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReachStackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReachStackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
