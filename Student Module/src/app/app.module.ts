// built-in
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
// components
import { AppComponent } from "./app.component";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
//routes
import { appRoutes } from "./routes";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { UserService } from "./shared/user.service";

import { DepartmentService } from "./shared/departmentService";
import { AlertService } from "./shared/alertService";
//other
import { AuthGuard } from "./auth/auth.guard";
import { AuthInterceptor } from "./auth/auth.interceptor";

import { ResultdetailComponent } from "./user-profile/resultdetail/resultdetail.component";
import { TestsComponent } from "./user-profile/tests/tests.component";
import { ScheduledTestsComponent } from './user-profile/scheduled-tests/scheduled-tests.component';

// import { Config, CountdownModule } from "ngx-countdown";
// import { CountdownConfig } from "ngx-countdown/src/countdown.config";
// function countdownConfigFactory(): Config {
//   return { template: `$!h!:$!m!:$!s!` };
// }
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    ResultdetailComponent,
    TestsComponent,
    ScheduledTestsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    // CountdownModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    // { provide: CountdownConfig, useFactory: countdownConfigFactory },
    AuthGuard,
    UserService,

    DepartmentService,

    AlertService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
