// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { CategoryService } from './shared/category.service';
import { QuestionService } from './shared/question.service';
import { DepartmentService } from './shared/departmentService'
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';


import { CategoryComponent } from './user-profile/category/category.component';
import { QuestionComponent } from './user-profile/question/question.component';
import { QuesubmitComponent } from './user-profile/question/quesubmit/quesubmit.component';

import { ResultdetailComponent } from './user-profile/resultdetail/resultdetail.component';
import { TestsComponent } from './user-profile/tests/tests.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    CategoryComponent,
    QuestionComponent,
    QuesubmitComponent,
    ResultdetailComponent,
    TestsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, UserService , CategoryService ,DepartmentService, QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
