import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
// import { QuestionService } from '../../services/mock/fake-question.service'
import { QuestionService } from '../../services/question.service'
import { Question } from '../../shared/models/question';
// import { AuthService } from '../../services/mock/fake-authentication.service';
import { AuthService } from '../../services/authentication/auth.service';
import { ChecklistService } from '../../services/checklist.service';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Checklist } from 'src/app/shared/models/checklist';
import { ChecklistItem } from 'src/app/shared/models/checklist-item';
import { date } from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';
 

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent implements OnInit {

  public isSubmitted : boolean = false;
  public fg: FormGroup ;
  private isFinishedChecking = false;
  public isEndOfMonth;

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
    var dateNow = new Date();
    var endOfMonth = new Date(dateNow.getFullYear(),dateNow.getMonth()+1,0);
    this.isEndOfMonth = dateNow == endOfMonth;
    
    this.auth.currentEquipment.subscribe( x => this.eqType = x.equipment_TypeID) //get equipmentType in authService

    //get questions
    this.questionService.getQuestions(this.eqType)
    .subscribe(data => {
      this.questions = data.sort((a,b) => 
        {return a.rank-b.rank}); //sorting function
        
        //looping through questions: create item literal and push to checklistItemArray
        this.questions.map(x => {
          const items = this.fb.group({
            eqType: [x.equipment_TypeID],
            compID: [x.componentID],
            label: [x.question_Text],
            check: [''],
            condition: [''],
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
    if(item){
      item.get('desc').updateValueAndValidity()
      if(item.value) {
        item.get('condition').setValue('OK')
      }
    }
  }

  hasCharacters(input: FormControl) {
    const control = input.value as string
  
    return control.trim().length > 0 ? null : {hasNoCharacters: true}

  }

  get checklistItemArray(){
    return this.fg.get('checklistItems') as FormArray
  }

  onSubmit() {
    if(navigator.onLine){

      //touch all Check Control to validate
      Object.keys(this.checklistItemArray.controls).forEach( form => {
        this.checklistItemArray.get(form).get('check').markAsTouched();
      }) 


      if(this.fg.valid && !this.isSubmitted) {
  
        this.isSubmitted = true
        //turn checklistItemArray => checklistFormat
  
        const checklistItems: ChecklistItem[] = new Array();
  
        this.checklistItemArray.controls.map( x => {
          const item: ChecklistItem = {
            componentid: x.get('compID').value,
            conditionid: x.get('check').value? 'OK':'OTHER',
            equipment_TypeID: x.get('eqType').value,
            remarks: x.get('desc').value
          }
  
          checklistItems.push(item)
        })
        var _d = new Date()
        const checklist: Checklist = {
          checklist_items: checklistItems,
          equipmentID: this.auth.currentEquipmentValue.id,
          userID: this.auth.currentUserValue.id
        }
          
        this.checklistService.submitChecklist(checklist)
        .subscribe(data => {
          console.log('Submit Success!!') //added console log to ensure submit success
          this.checklistService.isSubmitSuccess = true
          document.location.href =`${environment.ecN4Url}`; //external url
          this.auth.logout();
          
        },
        (err) => {
          console.log(err);''
        },
        () => {
          this.isSubmitted = false;
        })
      } else {
        console.log(false)
      }
    }else{
      window.alert("No Connection, Please Connect to the Internet First")
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

  logout(){
    this.auth.logout();
    location.reload();
  }

}
