import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyEditComponent } from './survey/survey-edit/survey-edit.component';
import { SurveyViewComponent } from './survey/survey-view/survey-view.component';
import { SurveyStartComponent } from './survey/survey-start/survey-start.component';
import { SurveyService } from './survey/survey.service';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    SurveyEditComponent,
    SurveyViewComponent,
    SurveyStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [SurveyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
