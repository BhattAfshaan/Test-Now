import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { AlertService } from "../../shared/alertService";
import { Test } from "../../shared/testModel";
import { TestService } from "../../shared/testService";
import { UserDetails } from "../../shared/user.model";
import { UserService } from "../../shared/user.service";

@Component({
  selector: "app-scheduled-tests",
  templateUrl: "./scheduled-tests.component.html",
  styleUrls: ["./scheduled-tests.component.css"],
})
export class ScheduledTestsComponent implements OnInit {
  userDetails: UserDetails;
  tests: any[] = [];
  constructor(
    private userService: UserService,
    private router: Router,
    private testService: TestService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getCurrenUserProfile();
  }

  getCurrenUserProfile() {
    this.userService.getUserProfile().subscribe(
      (response: any) => {
        this.userDetails = response["reguser"];
        if (this.userDetails) {
          this.getTests();
        } else {
          this.alertService.showErrorAlert();
        }
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  getTests() {
    this.testService.getTests().subscribe(
      (response: Test[]) => {
        if (response && response.length > 0) {
          let mappedTests = response.map((item) => {
            let testDetails = {
              testID: item._id,
              testCode: item.testCode,
              testName: item.testName,
              testDate: item.testDate,
              testStartTime: item.testStartTime,
              testEndTime: item.testEndTime,
              testQuestions: item.testQuestions,
              courseID: item.testQuestions[0].subjectDetails.courseDetails._id,
              departmentID:
                item.testQuestions[0].subjectDetails.courseDetails
                  .departmentDetails._id,
              subjectID: item.testQuestions[0].subjectDetails._id,
              departmentName:
                item.testQuestions[0].subjectDetails.courseDetails
                  .departmentDetails.departmentName,
              courseName:
                item.testQuestions[0].subjectDetails.courseDetails.courseTitle,
              subjectName: item.testQuestions[0].subjectDetails.subjectName,
            };
            return testDetails;
          });
          this.tests = mappedTests.filter((item) => {
            return (
              item.courseID == this.userDetails.course._id &&
              item.departmentID == this.userDetails.department._id
            );
          });
        }
      },
      (_err) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  goToQuestions(selectedTest: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(selectedTest),
      },
    };

    this.router.navigate(["test"], navigationExtras);
  }

  goToResult(selectedTest: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(selectedTest),
      },
    };

    this.router.navigate(["userprofile/result"], navigationExtras);
  }
}
