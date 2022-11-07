import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddquestionComponent} from './user-profile/addquestion/addquestion.component';
import { ViewquestionComponent} from './user-profile/viewquestion/viewquestion.component';
import { ViewuserComponent} from './user-profile/viewuser/viewuser.component';
import { ResultComponent} from './user-profile/result/result.component';
import { ResdetailComponent} from './user-profile/resdetail/resdetail.component';
import {EditquestionComponent} from './user-profile/editquestion/editquestion.component';
import { AdddepartmentComponent } from './user-profile/adddepartment/adddepartment.component'
import {ViewDepartmentComponent} from './user-profile/view-department/view-department.component'

import { AuthGuard } from './auth/auth.guard';
import { EditdepartmentComponent } from './user-profile/editdepartment/editdepartment.component';
import { AddcourseComponent } from './user-profile/addcourse/addcourse.component';
import { ViewcourseComponent } from './user-profile/viewcourse/viewcourse.component';
import { EditcourseComponent } from './user-profile/editcourse/editcourse.component';
import { AddsubjectComponent } from './user-profile/addsubject/addsubject.component';
import { ViewsubjectComponent } from './user-profile/viewsubject/viewsubject.component';
import { EditsubjectComponent } from './user-profile/editsubject/editsubject.component';
import { AddtestComponent } from './user-profile/addtest/addtest.component';
import { ViewtestComponent } from './user-profile/viewtest/viewtest.component';
import { EdittestComponent } from './user-profile/edittest/edittest.component';
import { ScheduledTestsComponent } from './user-profile/scheduled-tests/scheduled-tests.component';
import { ScheduledTestQuestionsComponent } from './user-profile/scheduled-test-questions/scheduled-test-questions.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard],
        // path: 'userprofile', component: UserProfileComponent,
        children: [
        { path: 'Tests', component: ScheduledTestsComponent  },
        { path: 'questions', component: ScheduledTestQuestionsComponent  },
        { path: 'Adddepartment', component: AdddepartmentComponent},
        { path: 'ViewDepartment', component: ViewDepartmentComponent},
        { path: 'EditDepartment/:id', component: EditdepartmentComponent},
        { path: 'AddCourse', component: AddcourseComponent},
        { path: 'ViewCourse', component: ViewcourseComponent},
        { path: 'EditCourse/:id', component: EditcourseComponent},
        { path: 'AddSubject', component: AddsubjectComponent},
        { path: 'ViewSubject', component: ViewsubjectComponent},
        { path: 'EditSubject/:id', component: EditsubjectComponent},
        { path: 'Addq' , component : AddquestionComponent},
        { path: 'Viewq' , component : ViewquestionComponent},
        { path : 'Editq/:id' , component : EditquestionComponent},
        { path : 'AddTest' , component : AddtestComponent},
        { path : 'ViewTest' , component : ViewtestComponent},
        { path : 'EditTest/:id' , component : EdittestComponent},
        { path: 'viewuser' , component : ViewuserComponent},
        { path: 'result' , component : ResultComponent},
        { path: 'resdetail' , component: ResdetailComponent}

    ]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];
