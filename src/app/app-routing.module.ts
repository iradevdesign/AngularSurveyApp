import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyStartComponent } from './survey/survey-start/survey-start.component';
import { SurveyEditComponent } from './survey/survey-edit/survey-edit.component';
import { SurveyViewComponent } from './survey/survey-view/survey-view.component';


const routes: Routes = [
  {path: '', component: SurveyStartComponent},
  {path: 'new', component: SurveyEditComponent},
  {path: ':id', component: SurveyViewComponent},
  {path: ':id/edit', component: SurveyEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
