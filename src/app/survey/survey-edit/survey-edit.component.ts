import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Survey } from '../survey.model';
import { SurveyService } from '../survey.service';
import { FormGroup, NgForm, FormControl, Validators, FormArray } from '@angular/forms';
import { SurveyDetails } from '../survey-details.model';

@Component({
  selector: 'app-survey-edit',
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-edit.component.css']
})
export class SurveyEditComponent implements OnInit {
  id: number;
  survey: Survey;
  editMode = false;
  surveyForm: FormGroup;

  constructor(private route: ActivatedRoute, private surveyService: SurveyService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.survey = this.surveyService.getSurvey(this.id);
        this.initForm()
      }
    )
  }

  private initForm() {
    let surveyName = '';
    let surveyQuestions = new FormArray([]);
    if(this.editMode) {
      surveyName = this.survey.surveyName;
      if(this.survey['surveyList']) {
        for (let survey of this.survey.surveyList) {
          if(survey.type != 'text') {
            let answersList = [];
          for(let answer of survey.answers) {
            answersList.push(answer)
          }
          surveyQuestions.push(
            new FormGroup({
              'type': new FormControl(survey.type, Validators.required),
              'question': new FormControl(survey.question, Validators.required),
              'answers': new FormControl(answersList, Validators.required)
            })
          )
        } else {
          surveyQuestions.push(
            new FormGroup({
              'type': new FormControl(survey.type, Validators.required),
              'question': new FormControl(survey.question, Validators.required),
              'answers': new FormControl(survey.answers, Validators.required)
            })
          )
        }
       }
      }
    } else {
      surveyQuestions.push(
        new FormGroup({
          'type': new FormControl(null, Validators.required),
          'question': new FormControl(null, Validators.required),
          'answers': new FormControl(null, Validators.required)
        })
      )
    }
    this.surveyForm = new FormGroup({
      'surveyName': new FormControl(surveyName, Validators.required),
      'surveyQuestions': surveyQuestions
    })
  }
  onAddQuestion() {
    (<FormArray>this.surveyForm.get('surveyQuestions')).push(
      new FormGroup({
        'type': new FormControl(null, Validators.required),
        'question': new FormControl(null, Validators.required),
        'answers': new FormControl(null, Validators.required)
      })
    )
  }
  onSubmitForm() {
    if(this.editMode === true) {
      // Edit page
      let surveyList: SurveyDetails[] = [];
      let survey: Survey;
      for (let surveyQuestion of this.surveyForm.value.surveyQuestions) {
        let answers: string[] = [];
        let answer: string;
        
        if(surveyQuestion.type != 'text') {
          if(typeof surveyQuestion.answers === 'string') {
            let firstAnswer = surveyQuestion.answers.split(',')[0];
            let secondAnswer = surveyQuestion.answers.split(',')[1];
            let thirdAnswer = surveyQuestion.answers.split(',')[2];
            answers.push(firstAnswer, secondAnswer, thirdAnswer)
          } else {
            for(let answer of surveyQuestion.answers) {
              answers.push(answer)
            }
          }
          let surveyDetail: SurveyDetails = new SurveyDetails(surveyQuestion.type, surveyQuestion.question, answers);
          surveyList.push(surveyDetail);
        } else {
            answer = surveyQuestion.answers;
            let surveyDetail: SurveyDetails = new SurveyDetails(surveyQuestion.type, surveyQuestion.question, answer);
            surveyList.push(surveyDetail);
        }
      }
      survey = new Survey(this.surveyForm.value.surveyName, surveyList);
      this.surveyService.updateSurvey(survey, this.id)
      this.router.navigate(['/']);
    } else {
      // New page
      // This is for one question
      if(this.surveyForm.value.surveyQuestions.length < 2) {
        if(this.surveyForm.value.surveyQuestions[0].type === 'text') {
          let surveyList = new SurveyDetails(this.surveyForm.value.surveyQuestions[0].type, this.surveyForm.value.surveyQuestions[0].question, this.surveyForm.value.surveyQuestions[0].answers)
          let survey = new Survey(this.surveyForm.value.surveyName, [surveyList]);
          this.surveyService.newSurvey(survey);
        } else {
          let firstAnswer = this.surveyForm.value.surveyQuestions[0].answers.split(',')[0];
          let secondAnswer = this.surveyForm.value.surveyQuestions[0].answers.split(',')[1];
          let thirdAnswer = this.surveyForm.value.surveyQuestions[0].answers.split(',')[2];
          let answersList = [];
          answersList.push(firstAnswer, secondAnswer, thirdAnswer);
          let surveyList = new SurveyDetails(this.surveyForm.value.surveyQuestions[0].type, this.surveyForm.value.surveyQuestions[0].question, answersList);
          let survey = new Survey(this.surveyForm.value.surveyName, [surveyList]);
          this.surveyService.newSurvey(survey);
        }
      } 
      // This is for more questions
      else {
        let surveyList: SurveyDetails[] = [];
        let survey: Survey;
        for (let surveyQuestion of this.surveyForm.value.surveyQuestions) {
          let answers: string[] = [];
          let answer: string;
          
          if(surveyQuestion.type != 'text') {
            if(typeof surveyQuestion.answers === 'string') {
              let firstAnswer = surveyQuestion.answers.split(',')[0];
              let secondAnswer = surveyQuestion.answers.split(',')[1];
              let thirdAnswer = surveyQuestion.answers.split(',')[2];
              answers.push(firstAnswer, secondAnswer, thirdAnswer)
            } else {
              for(let answer of surveyQuestion.answers) {
                answers.push(answer)
              }
            }
            let surveyDetail: SurveyDetails = new SurveyDetails(surveyQuestion.type, surveyQuestion.question, answers);
            surveyList.push(surveyDetail);
          } else {
              answer = surveyQuestion.answers;
              let surveyDetail: SurveyDetails = new SurveyDetails(surveyQuestion.type, surveyQuestion.question, answer);
              surveyList.push(surveyDetail);
          }
        }
        survey = new Survey(this.surveyForm.value.surveyName, surveyList);
        this.surveyService.newSurvey(survey);
      }
      this.router.navigate(['/']);
    }
  }


}
