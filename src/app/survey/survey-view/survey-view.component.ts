import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SurveyService } from '../survey.service';
import { Survey } from '../survey.model';

@Component({
  selector: 'app-survey-view',
  templateUrl: './survey-view.component.html',
  styleUrls: ['./survey-view.component.css']
})
export class SurveyViewComponent implements OnInit {
  id: number;
  survey: Survey;

  constructor(private route: ActivatedRoute, private router: Router, private surveyService: SurveyService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.survey = this.surveyService.getSurvey(this.id);
      }
    )
  }

}
