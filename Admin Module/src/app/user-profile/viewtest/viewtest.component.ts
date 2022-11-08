import { Component, OnInit } from "@angular/core";
import { TestService } from "../../shared/testService";
import { Test } from "../../shared/testModel";
import { AlertService } from "../../shared/alertService";

@Component({
  selector: "app-viewtest",
  templateUrl: "./viewtest.component.html",
  styleUrls: ["./viewtest.component.css"],
})
export class ViewtestComponent implements OnInit {
  tests: Test[] = [];
  searchText: any;
  constructor(
    private testService: TestService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getTests();
  }
  getTests() {
    this.testService.getTests().subscribe(
      (response: Test[]) => {
        this.tests = response;
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  deleteTest(testID: string) {
    this.testService.deleteTestByID(testID).subscribe(
      (response) => {
        if (response) {
          this.alertService.showSuccessAlert(() => {
            this.getTests();
          }, false);
        } else {
          this.alertService.showErrorAlert();
        }
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }
}
