import { Component, OnInit } from "@angular/core";
import { UserService } from "../../shared/user.service";
import { ResultService } from "../../shared/result.service";
import { AlertService } from "../../shared/alertService";
import { Result } from "../../shared/result.model";
import { UserDetails } from "../../shared/user.model";
import { TestResult } from "../../shared/TestResult";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-resultdetail",
  templateUrl: "./resultdetail.component.html",
  styleUrls: ["./resultdetail.component.css"],
})
export class ResultdetailComponent implements OnInit {
  public userDetails: UserDetails;
  public resultDetails: Result;
  public testResult: TestResult;
  public selectedTest: any;
  isResultAvailable: boolean = true;
  constructor(
    private userService: UserService,
    private resultService: ResultService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getTestDetails();
  }

  getTestDetails() {
    this.route.queryParams.subscribe((params) => {
      this.selectedTest = JSON.parse(params["data"]);
      this.getUserDetails();
    });
  }

  getUserDetails() {
    this.userService.getUserProfile().subscribe(
      (response: any) => {
        this.userDetails = response["reguser"];
        this.getResultDetails();
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  getResultDetails() {
    this.resultService.getResultDetails().subscribe(
      (response: Result[]) => {
        if (response && response.length > 0) {
          this.resultDetails = response.filter(
            (item) =>
              item.email == this.userDetails.email &&
              item.testID == this.selectedTest.testID
          )[0];
        }
        this.getTestResult();
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  getTestResult() {
    this.resultService.getResult(this.userDetails.email).subscribe(
      (response: TestResult[]) => {
        if (response && response.length > 0) {
          this.testResult = response.filter(
            (item) => item._id == this.selectedTest.testID
          )[0];
        }
        if (!response || response.length == 0) {
          this.isResultAvailable = false;
        }
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }
}
