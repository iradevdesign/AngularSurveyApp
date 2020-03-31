import { SurveyList } from './survey-list.model';
import { Survey } from './survey.model';
import { SurveyDetails } from './survey-details.model';

export class SurveyService {
    surveysList = new SurveyList(
        [
            new Survey('First Survey', [
                new SurveyDetails('single', 'What is your favorite color?', ['red', 'black', 'white']),
                new SurveyDetails('multi', 'What is your favorite pet?', ['cat', 'rabbit', 'dog']),
                new SurveyDetails('text', 'What is your name?', 'Robert')
            ]),
            new Survey('Second Survey', [
                new SurveyDetails('single', 'Whats upp?', ['red', 'black', 'white']),
                new SurveyDetails('multi', 'What is your favorite pet?', ['cat', 'rabbit', 'dog']),
                new SurveyDetails('text', 'What is your name?', 'Robert')
            ])
        ]
    )

    getSurveysList() {
        return this.surveysList;
    }
    getSurvey(index: number) {
        return this.surveysList.surveyList[index];
    }
    updateSurvey(survey: Survey, index: number) {
        this.surveysList.surveyList[index] = survey;
    }
    newSurvey(survey: Survey) {
        this.surveysList.surveyList.push(survey);
    }
}