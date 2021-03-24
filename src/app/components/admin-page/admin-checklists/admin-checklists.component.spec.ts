import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ExportAsModule } from 'ngx-export-as';

import { AdminChecklistsComponent } from './admin-checklists.component';

describe('AdminChecklistsComponent', () => {
  let component: AdminChecklistsComponent;
  let fixture: ComponentFixture<AdminChecklistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
      ExportAsModule,
    ReactiveFormsModule],
      declarations: [ AdminChecklistsComponent],
      providers: [DatePipe]
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
