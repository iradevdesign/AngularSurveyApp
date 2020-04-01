import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SurveyService } from '../survey.service';
import { Survey } from '../survey.model';
import { SurveyList } from '../survey-list.model';

@Component({
  selector: 'app-survey-view',
  templateUrl: './survey-view.component.html',
  styleUrls: ['./survey-view.component.css']
})
export class SurveyViewComponent implements OnInit {
  id: number;
  survey: Survey;
  previewId: number;
  nextId: number;
  surveyList: SurveyList;
  surveyListLenght: number;

  constructor(private route: ActivatedRoute, private router: Router, private surveyService: SurveyService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.survey = this.surveyService.getSurvey(this.id);
        this.previewId = this.id - 1;
        this.nextId = this.id + 1;
        this.surveyList = this.surveyService.getSurveysList();
        this.surveyListLenght = this.surveyList.surveyList.length;
      }
    )
  }

  onPreview() {
    this.router.navigate(['../', this.previewId])
  }

  onNext() {
    this.router.navigate(['../', this.nextId])
  }

}
