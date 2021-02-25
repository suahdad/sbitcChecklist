import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { equal } from 'assert';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ChecklistService } from 'src/app/services/checklist.service';
import { QuestionService } from 'src/app/services/question.service';
import { VoucherService } from 'src/app/voucher.service';

import { EquipmentFormComponent } from './equipment-form.component';

describe('EquipmentFormComponent', () => {
  let component: EquipmentFormComponent;
  let fixture: ComponentFixture<EquipmentFormComponent>;
  let mockChecklistService;
  let mockVoucherService;
  let mockAuthService;
  let mockQuestionService;
  beforeEach(async(() => {
    mockChecklistService = {
      submitChecklist: (sample) => {return of([true])}
    }

    mockVoucherService = {
      postVoucher: () => {},
      saveVoucher: () => {}
    }

    mockAuthService = {
      currentEquipment: of({
        equipment_TypeID:''
      })
    }

    mockQuestionService = {
      getQuestions:() => {
        return of([true])
      }
    }
    TestBed.configureTestingModule({
      declarations: [ EquipmentFormComponent ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: ChecklistService, useValue: mockChecklistService},
        {provide: VoucherService, useValue: mockVoucherService},
        {provide: AuthService, useValue: mockAuthService},
        {provide: QuestionService, useValue: mockQuestionService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should post voucher on successful submit', async () => {
    spyOnProperty(navigator,'onLine').and.returnValue(true);
    spyOnProperty(component.fg,'valid').and.returnValue(true);
    spyOn(mockVoucherService, 'postVoucher').and.returnValue(of(''))
    spyOn(mockVoucherService, 'saveVoucher')
    spyOn(component,'redirectToN4')
    spyOn(component,'prepChecklist')
    spyOn(component, 'logout')
    component.isSubmitted = false;

    await fixture.whenStable();

    component.onSubmit();
    expect(mockVoucherService.postVoucher).toHaveBeenCalled();
    expect(mockVoucherService.saveVoucher).toHaveBeenCalled();
  })
});
