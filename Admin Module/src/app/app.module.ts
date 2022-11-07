// built-in
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FileSelectDirective } from "ng2-file-upload";
// components
import { AppComponent } from "./app.component";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
//routes
import { appRoutes } from "./routes";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { UserService } from "./shared/user.service";
import { CategoryService } from "./shared/category.service";
import { FoodService } from "./shared/food.service";
import { QuestionService } from "./shared/question.service";
import { VwuserService } from "./shared/vwuser.service";
import { ResultService } from "./shared/result.service";
//other
import { AuthGuard } from "./auth/auth.guard";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { AddquestionComponent } from "./user-profile/addquestion/addquestion.component";
import { ViewquestionComponent } from "./user-profile/viewquestion/viewquestion.component";
import { EditquestionComponent } from "./user-profile/editquestion/editquestion.component";
import { ViewuserComponent } from "./user-profile/viewuser/viewuser.component";
import { ResultComponent } from "./user-profile/result/result.component";
import { ResdetailComponent } from "./user-profile/resdetail/resdetail.component";
import { AdddepartmentComponent } from "./user-profile/adddepartment/adddepartment.component";
import { ViewDepartmentComponent } from "./user-profile/view-department/view-department.component";
import { EditdepartmentComponent } from "./user-profile/editdepartment/editdepartment.component";
import { AddcourseComponent } from "./user-profile/addcourse/addcourse.component";
import { ViewcourseComponent } from "./user-profile/viewcourse/viewcourse.component";
import { EditcourseComponent } from "./user-profile/editcourse/editcourse.component";
import { AddsubjectComponent } from "./user-profile/addsubject/addsubject.component";
import { ViewsubjectComponent } from "./user-profile/viewsubject/viewsubject.component";
import { EditsubjectComponent } from "./user-profile/editsubject/editsubject.component";
import { AddtestComponent } from "./user-profile/addtest/addtest.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AmazingTimePickerModule } from "amazing-time-picker";
import { CustomDateService } from "./shared/CustomDateService";
import { ViewtestComponent } from "./user-profile/viewtest/viewtest.component";
import { EdittestComponent } from "./user-profile/edittest/edittest.component";
import { ScheduledTestsComponent } from "./user-profile/scheduled-tests/scheduled-tests.component";
import { ScheduledTestQuestionsComponent } from "./user-profile/scheduled-test-questions/scheduled-test-questions.component";

import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
  NgxUiLoaderRouterModule,
  NgxUiLoaderHttpModule,
} from "ngx-ui-loader";

import { Ng2SearchPipeModule } from "ng2-search-filter";

// const ngxUiLoaderConfig: NgxUiLoaderConfig = {
//   bgsColor: 'rgba(12,80,219,0.98)',
//   bgsOpacity: 1,
//   bgsPosition: POSITION.bottomRight,
//   bgsSize: 40,
//   bgsType: SPINNER.threeStrings,
//   fgsColor: 'rgba(12,80,219,0.98)',
//   fgsPosition: POSITION.centerCenter
//   };
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "red",
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.circle,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 2, // progress bar thickness
};

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    // FileSelectDirective,
    AddquestionComponent,
    ViewquestionComponent,
    EditquestionComponent,
    ViewuserComponent,
    ResultComponent,
    ResdetailComponent,
    AdddepartmentComponent,
    ViewDepartmentComponent,
    EditdepartmentComponent,
    AddcourseComponent,
    ViewcourseComponent,
    EditcourseComponent,
    AddsubjectComponent,
    ViewsubjectComponent,
    EditsubjectComponent,
    AddtestComponent,
    ViewtestComponent,
    EdittestComponent,
    ScheduledTestsComponent,
    ScheduledTestQuestionsComponent,
    ScheduledTestQuestionsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    AmazingTimePickerModule,
    HttpClientModule,
    Ng2SearchPipeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    UserService,
    CategoryService,
    FoodService,
    CustomDateService,
    QuestionService,
    VwuserService,
    ResultService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
