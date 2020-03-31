import { Component, OnInit } from '@angular/core';
import { SurveyService } from './survey.service';
import { SurveyList } from './survey-list.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  surveysList: SurveyList;

  constructor(private surveyService: SurveyService, private route: ActivatedRoute, private router: Router) { 
    this.surveysList = this.surveyService.getSurveysList();
  }

  ngOnInit() {
  }

  onCreateSurvey() {
    this.router.navigate(['new']);
  }
  onEditSurvey(index: number) {
    this.router.navigate([index, 'edit'])
  }
  onViewSurvey(index: number) {
    this.router.navigate([index])
  }

}
