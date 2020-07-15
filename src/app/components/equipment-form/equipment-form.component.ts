import { Component, OnInit } from '@angular/core';
// import { QuestionService } from '../../services/mock/fake-question.service'
import { QuestionService } from '../../services/question.service'
import { Question } from '../../shared/models/question';
// import { AuthService } from '../../services/mock/fake-authentication.service';
import { AuthService } from '../../services/authentication/auth.service';
import { ChecklistService } from '../../services/checklist.service';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Checklist } from 'src/app/shared/models/checklist';
import { ChecklistItem } from 'src/app/shared/models/checklist-item';
import { validateBasis } from '@angular/flex-layout';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { group } from 'console';
 

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent implements OnInit {

  private logo = require("../../../assets/check.png");
  private isSubmitted : boolean = false;
  private fg: FormGroup ;

  questions: Question[] = new Array();
  eqType: string;

  constructor(private questionService: QuestionService,
    private auth: AuthService,
    private checklistService: ChecklistService,
    private fb: FormBuilder) {

      //instantiate fromgroup
      this.fg = this.fb.group({
        checklistItems: this.fb.array([])
      })

   }

  ngOnInit() {
    this.auth.currentEquipment.subscribe( x => this.eqType = x.equipment_TypeID) //get equipmentType in authService

    //get questions
    this.questionService.getQuestions(this.eqType)
    .subscribe(data => {
      this.questions = data.sort((a,b) => 
        a['rank'] > b['rank'] ? 1 : a['rank'] === b['rank'] ? 0 : -1); //sorting function
        
        //looping through questions: create item literal and push to checklistItemArray
        this.questions.map(x => {
          const items = this.fb.group({
            eqType: [x.equipment_TypeID],
            compID: [x.componentID],
            label: [x.question_Text],
            check: [''],
            desc: ['']
          },{validators: (group) => {
              const check = group.get('check')
              if(check.value){
                group.get('desc').setValidators(Validators.maxLength(50))
                return null
              }
              group.get('desc').setValidators(Validators.maxLength(50))
              group.get('desc').setValidators(Validators.minLength(4))
              group.get('desc').setValidators(this.hasCharacters)

              return Validators.required(group.get('desc'))
          }})
    
          this.checklistItemArray.push(items)
        })
    })
  }

  refresh(item: AbstractControl) {
    item.get('desc').updateValueAndValidity()
    console.log(item.parent)
  }

  hasCharacters(input: FormControl) {
    const control = input.value as string
  
    return control.trim().length > 0 ? null : {hasNoCharacters: true}

  }

  get checklistItemArray(){
    return this.fg.get('checklistItems') as FormArray
  }

  onSubmit() {
    this.fg.updateValueAndValidity()
    if(this.fg.valid) {
      // this.isSubmitted = true;

      //turn checklistItemArray => checklistFormat

      const checklistItems: ChecklistItem[] = new Array();

      this.checklistItemArray.controls.map( x => {
        const item: ChecklistItem = {
          componentid: x.get('compID').value,
          conditionid: x.get('check').value? 'OK':'OTHER',
          equipment_typeid: x.get('eqType').value,
          remarks: x.get('desc').value
        }

        checklistItems.push(item)
      })

      const checklist: Checklist = {
        checklist_items: checklistItems,
        date_created: new Date,
        equipmentid: this.auth.currentEquipmentValue.id,
        userid: this.auth.currentUserValue.id
      }
      
      
      console.log(checklist)

      this.checklistService.submitChecklist(checklist)
    } else {
      console.log(false)
    }

    

    
    // this.checklistService.submitChecklist();
  }

  setValidators() {
    this.checklistItemArray.controls.map((x:FormGroup) => {
      const checkBox = x.get('check');
      const desc = x.get('desc');

      if(checkBox.value != 'functional') {
        desc.setValidators([Validators.required])
      }
    })
  }

}
