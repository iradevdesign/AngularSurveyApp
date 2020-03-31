export class SurveyDetails {
    type: 'single' | 'multi' | 'text';
    question: string;
    answers: string[] | string;

    constructor( type: 'single' | 'multi' | 'text',  question: string,  answers: string[] | string) {
        this.type = type;
        this.question = question;
        this.answers = answers;
    }
}
