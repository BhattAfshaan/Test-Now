import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Result } from "../../shared/result.model";
import { UserDetails } from "../../shared/user.model";
import { NgForm } from "@angular/forms";
import { ResultService } from "../../shared/result.service";
import { UserService } from "../../shared/user.service";
import { AlertService } from "src/app/shared/alertService";
import { LocationStrategy } from "@angular/common";

@Component({
  selector: "app-tests",
  templateUrl: "./tests.component.html",
  styleUrls: ["./tests.component.css"],
})
export class TestsComponent implements OnInit {
  userDetails: UserDetails;
  public selectedTest: any;
  public submissionData = new Result();
  questions: any[] = [];
  maxMarks: number = 0;
  minMarks: number = 0;
  timeLeft: number = 60;
  interval: any;
  isSubmitted: boolean = false;
  isExamConcluded: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private location: LocationStrategy
  ) {}
  ngOnInit() {
    // this.disableBackAction();
    this.getTestDetails();
    this.getUserDetails();
    this.startTimer();
    this.toggleQuestions();
    this.goToTests();
  }

  disableBackAction() {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  getTestDetails() {
    this.route.queryParams.subscribe((params) => {
      this.selectedTest = JSON.parse(params["data"]);
      this.getMaxMarks();
    });
  }

  getUserDetails() {
    this.userService.getUserProfile().subscribe(
      (response: any) => {
        this.userDetails = response["reguser"];
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  toggleQuestions(callback?: () => void) {
    if (
      this.selectedTest.testQuestions &&
      this.selectedTest.testQuestions.length > 0
    ) {
      for (let i = 0; i < this.selectedTest.testQuestions.length; i++) {
        setTimeout(() => {
          this.isSubmitted = false;
          this.questions = [];
          this.questions.push(this.selectedTest.testQuestions[i]);
          if (this.selectedTest.testQuestions.length - 1 === i) {
            if (callback) {
              callback();
            }
          }
        }, i * 10000); //1 minute 60000
      }
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 1000);
  }

  goToTests() {
    this.toggleQuestions(() => {
      setTimeout(() => {
        this.alertService.showSuccessAlert(() => {
          this.router.navigate(["userprofile/scheduled-tests"], {
            replaceUrl: true,
          });
        }, true);
      }, 10000);
    });
  }

  getMaxMarks() {
    this.maxMarks = this.selectedTest.testQuestions.reduce(
      (total: any, current: any) => total + parseInt(current.marks),
      0
    );
    this.getMinMarks();
  }

  getMinMarks() {
    this.minMarks = Math.round(this.maxMarks / 4);
  }

  onSubmit(form: NgForm) {
    this.isSubmitted = true;
    this.submissionData.departmentID = this.selectedTest["departmentID"];
    this.submissionData.courseID = this.selectedTest["courseID"];
    this.submissionData.subjectID = this.selectedTest["subjectID"];
    this.submissionData.testID = this.selectedTest["testID"];
    this.submissionData.departmentName = this.selectedTest["departmentName"];
    this.submissionData.courseName = this.selectedTest["courseName"];
    this.submissionData.subjectName = this.selectedTest["subjectName"];
    this.submissionData.testName = this.selectedTest["testName"];
    this.submissionData.questionID = form.value.questionID;
    this.submissionData.email = this.userDetails.email;
    this.submissionData.userName = this.userDetails.fullName;
    this.submissionData.submittedAnswer = form.value.uanswer;
    this.submissionData.correctAnswer = form.value.canswer;
    this.submissionData.minMarks = this.minMarks;
    this.submissionData.maxMarks = this.maxMarks;
    this.submissionData.marksObtained =
      form.value.uanswer === form.value.canswer
        ? parseInt(form.value.marks)
        : 0;
    if (this.submissionData) {
      this.resultService.saveSubmissionData(this.submissionData).subscribe(
        (response: any) => {
          console.log(response, "success");
        },
        (_error) => {
          this.alertService.showErrorAlert();
        }
      );
    }
  }
}
