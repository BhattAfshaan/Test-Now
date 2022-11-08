import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { AlertService } from "../../shared/alertService";
import { Question } from "../../shared/question1.model";
import { Test } from "../../shared/testModel";
import { TestService } from "../../shared/testService";

@Component({
  selector: "app-scheduled-tests",
  templateUrl: "./scheduled-tests.component.html",
  styleUrls: ["./scheduled-tests.component.css"],
})
export class ScheduledTestsComponent implements OnInit {
  tests: Test[] = [];
  searchText: any;
  constructor(
    private testService: TestService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getTests();
  }

  getTests() {
    this.testService.getTests().subscribe(
      (response: Test[]) => {
        if (response && response.length > 0) {
          this.tests = response;
        }
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  goToQuestions(questions: Question[]) {
    if (questions && questions.length > 0) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          data: JSON.stringify(questions),
        },
      };
      this.router.navigate(["userprofile/questions"], navigationExtras);
    }
  }
}
