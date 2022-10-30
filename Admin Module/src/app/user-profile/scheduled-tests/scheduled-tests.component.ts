import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Question } from 'src/app/shared/question1.model';
import { Test } from 'src/app/shared/testModel';
import { TestService } from 'src/app/shared/testService';

@Component({
  selector: 'app-scheduled-tests',
  templateUrl: './scheduled-tests.component.html',
  styleUrls: ['./scheduled-tests.component.css']
})
export class ScheduledTestsComponent implements OnInit {
  tests:Test[]= []
  constructor(private testService:TestService, private router:Router) { }

  ngOnInit() {
    this.getTests()
  }

  getTests() {
    this.testService.getTests().subscribe((res:Test[]) => {
        this.tests = res
      },
      err => {

      }
    );
  }

  goToQuestions(questions: Question[]) {
    if(questions && questions.length > 0) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
            "data": JSON.stringify(questions)
        }
      }
      this.router.navigate (  ['userprofile/questions'], navigationExtras)
    }
  }
}
