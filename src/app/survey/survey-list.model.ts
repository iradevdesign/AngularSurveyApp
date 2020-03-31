import { Survey } from './survey.model';

export class SurveyList {
    surveyList: Survey[];
    constructor(surveyList: Survey[]) {     
        this.surveyList = surveyList;
    }
}