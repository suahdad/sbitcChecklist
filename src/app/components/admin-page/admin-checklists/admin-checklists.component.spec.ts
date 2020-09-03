import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChecklistsComponent } from './admin-checklists.component';

describe('AdminChecklistsComponent', () => {
  let component: AdminChecklistsComponent;
  let fixture: ComponentFixture<AdminChecklistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChecklistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
