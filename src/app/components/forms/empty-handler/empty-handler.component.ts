import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service'
import { Question } from 'src/app/shared/models/question';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-empty-handler',
  templateUrl: './empty-handler.component.html',
  styleUrls: ['./empty-handler.component.css']
})
export class EmptyHandlerComponent implements OnInit {

  private logo = require("../check.png")
  private isSubmitted : boolean = false;

  questions: Question[] = new Array();
  eqType: string;
  constructor(private questionService: QuestionService,
    private auth: AuthService) {
      this.auth.currentEquipment.subscribe( x => this.eqType = x.equipment_TypeID) //get equipmentType in authService

   }

  ngOnInit() {
    this.questionService.getQuestions(this.eqType)
    .subscribe(data => {
      this.questions = data.sort((a,b) => 
        a['rank'] > b['rank'] ? 1 : a['rank'] === b['rank'] ? 0 : -1) //sorting function
    })
  }

  onSubmit() {
    console.log("submitted")
    this.isSubmitted = true;

  }

}