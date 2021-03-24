import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ExportAsModule, ExportAsService } from 'ngx-export-as';

import { AdminChecklistIssuesComponent } from './admin-checklist-issues.component';

describe('AdminChecklistIssuesComponent', () => {
  let component: AdminChecklistIssuesComponent;
  let fixture: ComponentFixture<AdminChecklistIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChecklistIssuesComponent],
      imports: [HttpClientModule,
    ReactiveFormsModule,
  ExportAsModule],
  providers: [DatePipe]
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
