import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  let router;
  let mockChecklistService;
  let mockVoucherService;
  let mockAuthService;
  let mockQuestionService;
  beforeEach(async(() => {
    mockChecklistService = {
      submitChecklist: (sample) => {return of([true])},
      isSubmitSuccess: ''
    }

    mockVoucherService = {
      postVoucher: () => {},
      saveVoucher: () => {}
    }

    mockAuthService = {
      currentEquipment: of({
        equipment_TypeID:''
      }),
      currentUserValue: {
        id:''
      },
      currentEquipmentValue: {
        id:''
      }
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
    router = TestBed.inject(Router)
    mockAuthService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should post voucher on successful submit', async () => {
    prepMocks();

    await fixture.whenStable();

    component.onSubmit();
    expect(mockVoucherService.postVoucher).toHaveBeenCalled();
    expect(mockVoucherService.saveVoucher).toHaveBeenCalled();
  })

  it('should navigate to n4 after successful submit',async () =>{
    prepMocks();
    await fixture.whenStable();

    let spy = spyOn(router,'navigate')
    component.onSubmit();
    expect(spy).toHaveBeenCalledWith(['n4']);
  })

  function prepMocks(){
    spyOnProperty(navigator,'onLine').and.returnValue(true);
    spyOnProperty(component.fg,'valid').and.returnValue(true);
    spyOn(mockVoucherService, 'postVoucher').and.returnValue(of(''))
    spyOn(mockVoucherService, 'saveVoucher')
    spyOn(component,'prepChecklist')
    spyOn(component, 'logout')
    component.isSubmitted = false;
  }
});
