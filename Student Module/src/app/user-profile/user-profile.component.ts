import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NavigationExtras, Router } from '@angular/router';
import { UserDetails } from '../shared/user.model';
import { TestService } from '../shared/testService';
import { Test } from '../shared/testModel';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails: UserDetails;
  tests:Test[]= []
  constructor(private userService: UserService, private router: Router, private testService:TestService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['reguser'];
        this.getTests()
      },
      err => {
        console.log(err);

      }
    );
  }

  getTests() {
    this.testService.getTests().subscribe((res:Test[]) => {
        this.tests = res
       
        // if(responseData.length > 0) {
        //   for(let item of responseData) {
        //     for(let testData of item.testQuestions) {
        //        if(testData.subjectDetails.courseDetails._id == this.userDetails.course._id) {
        //         const testExists = this.tests.some((item)=> item._id == item._id)
        //         if(!testExists) this.tests.push(testData)
        //         console.log(this.tests)
                
        //        }
        //     }
        //   }
        // }
      },
      err => {
        console.log(err);

      }
    );
  }

  goToQuestions(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "data": JSON.stringify(this.tests[0].testQuestions)
      }
    };
   
    this.router.navigate (  ['userprofile/test'], navigationExtras);
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
