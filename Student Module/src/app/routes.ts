import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { CategoryComponent} from './user-profile/category/category.component';
import { QuestionComponent } from './user-profile/question/question.component';

import { ResultdetailComponent} from './user-profile/resultdetail/resultdetail.component';
import { QuesubmitComponent } from './user-profile/question/quesubmit/quesubmit.component';
import { AuthGuard } from './auth/auth.guard';
import { TestsComponent } from './user-profile/tests/tests.component';

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
        children: [{ path: 'cat', component: CategoryComponent  },
        { path : 'test' , component: TestsComponent},
        { path : 'result' , component: ResultdetailComponent},
       
        {path: 'questions' , component: QuestionComponent ,
        children: [{ path: 'qsubmit/:id' , component: QuesubmitComponent}]
        }
    ]
    },
    
    {
        path: '', redirectTo: '/userprofile', pathMatch: 'full'
    }
];
