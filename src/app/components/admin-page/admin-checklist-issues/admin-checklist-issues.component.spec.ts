import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChecklistIssuesComponent } from './admin-checklist-issues.component';

describe('AdminChecklistIssuesComponent', () => {
  let component: AdminChecklistIssuesComponent;
  let fixture: ComponentFixture<AdminChecklistIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChecklistIssuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChecklistIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
