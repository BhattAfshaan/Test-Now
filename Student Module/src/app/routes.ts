import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

import { ResultdetailComponent } from "./user-profile/resultdetail/resultdetail.component";

import { AuthGuard } from "./auth/auth.guard";
import { TestsComponent } from "./user-profile/tests/tests.component";
import { ScheduledTestsComponent } from "./user-profile/scheduled-tests/scheduled-tests.component";

export const appRoutes: Routes = [
  {
    path: "signup",
    component: UserComponent,
    children: [{ path: "", component: SignUpComponent }],
  },
  {
    path: "login",
    component: UserComponent,
    children: [{ path: "", component: SignInComponent }],
  },
  { path: "test", component: TestsComponent },
  {
    path: "userprofile",
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "result", component: ResultdetailComponent },
      { path: "scheduled-tests", component: ScheduledTestsComponent },
    ],
  },

  {
    path: "",
    redirectTo: "/userprofile",
    pathMatch: "full",
  },
];
