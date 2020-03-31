import { SurveyDetails } from './survey-details.model';

export class Survey {
    surveyName: string;
    surveyList: SurveyDetails[];

    constructor(surveyName: string, surveyList: SurveyDetails[]) {
        this.surveyName = surveyName;
        this.surveyList = surveyList;
    }
}
