import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/mock/fake-question.service'
// import { QuestionService } from '../../../services/question.service'
import { Question } from 'src/app/shared/models/question';
import { AuthService } from 'src/app/services/mock/fake-authentication.service';
// import { AuthService } from 'src/app/services/authentication/auth.service';
import { ChecklistService } from 'src/app/services/checklist.service';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
 

@Component({
  selector: 'app-empty-handler',
  templateUrl: './empty-handler.component.html',
  styleUrls: ['./empty-handler.component.css']
})
export class EmptyHandlerComponent implements OnInit {

  private logo = require("../check.png");
  private isSubmitted : boolean = false;
  private fg: FormGroup ;

  questions: Question[] = new Array();
  eqType: string;

  constructor(private questionService: QuestionService,
    private auth: AuthService,
    private checklistService: ChecklistService,
    private fb: FormBuilder) {
      this.auth.currentEquipment.subscribe( x => this.eqType = x.equipment_TypeID) //get equipmentType in authService

      this.questionService.getQuestions(this.eqType)
      .subscribe(data => {
        this.questions = data.sort((a,b) => 
          a['rank'] > b['rank'] ? 1 : a['rank'] === b['rank'] ? 0 : -1) //sorting function
      })
   }

  ngOnInit() {
    //create formgroup literal for checklistItem
    const items = this.fb.group({
      label: [''],
      check: [''],
      desc: ['']
    },{validators: (group) => {
      if (group.get('check').value != 'functional') {
        return Validators.required(group.get('desc'))
      }
    }})

    //instantiate fromgroup
    this.fg = this.fb.group({
      checklistItems: this.fb.array([])
    })

    // populate checklistItemArray with formgroup literal of checklist item
    this.questions.map(x => {
      const items = this.fb.group({
        eqType: [x.equipment_TypeID],
        label: [x.question_Text],
        check: [''],
        desc: ['']
      },{validators: (group) => {
        if (!group.get('check').value) {
          return Validators.required(group.get('desc'))
        }
      }})

      this.checklistItemArray.push(items)

    })

    // this.setValidators();
    // this.checklistItemArray.valueChanges.subscribe( x => console.log(x))
  }

  get checklistItemArray(){
    return this.fg.get('checklistItems') as FormArray
  }

  onSubmit() {
    if(this.fg.valid) {
      // this.isSubmitted = true;

      //turn checklistItemArray => checklistFormat
      console.log(JSON.stringify(this.checklistItemArray.value))
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
