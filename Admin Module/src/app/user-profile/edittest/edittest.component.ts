import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TestService } from "../../shared/testService";
import { CustomDateService } from "../../shared/CustomDateService";
import { Test } from "../../shared/testModel";
import { AmazingTimePickerService } from "amazing-time-picker";
import { AlertService } from "../../shared/alertService";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-edittest",
  templateUrl: "./edittest.component.html",
  styleUrls: ["./edittest.component.css"],
})
export class EdittestComponent implements OnInit {
  public selectedTest = new Test();
  public selectedTestID = "";
  viewDate: any;
  viewStartTime: any;
  viewEndTime: any;
  time: any;
  time24: any;
  constructor(
    private route: ActivatedRoute,
    private atp: AmazingTimePickerService,
    private alertService: AlertService,
    private router: Router,
    private testService: TestService,
    private customDateService: CustomDateService
  ) {}

  ngOnInit() {
    this.selectedTestID = this.route.snapshot.paramMap.get("id");
    this.getTestById();
  }

  getTestById() {
    this.testService.getTestByID(this.selectedTestID).subscribe(
      (response: Test) => {
        this.selectedTest = response;
        this.getViewDate();
        this.getViewTime();
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  onEdit(form: NgForm) {
    this.selectedTest.testDate = this.getFormattedDate();
    this.testService.updateTest(this.selectedTest).subscribe(
      (response) => {
        form.reset();
        if (response) {
          this.alertService.showSuccessAlert(() => {
            this.router.navigateByUrl("userprofile/ViewTest");
          }, true);
        } else {
          this.alertService.showErrorAlert();
        }
      },
      (_error) => {
        form.reset();
        this.alertService.showErrorAlert();
      }
    );
  }

  getFormattedDate(): string {
    return this.customDateService.toModel(this.selectedTest.testDate as any);
  }

  getViewDate() {
    this.viewDate = this.customDateService.fromModel(
      this.selectedTest.testDate
    );
    this.selectedTest.testDate = this.viewDate;
  }

  getViewTime() {
    this.viewStartTime = this.convertTimeFormat(
      this.selectedTest.testStartTime
    );
    this.viewEndTime = this.convertTimeFormat(this.selectedTest.testEndTime);
  }

  convertTimeFormat(time: any) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return sHours + ":" + sMinutes;
  }

  //handle time picker//
  open(type: string) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe((time) => {
      this.time24 = time;
      if (type == "startTime") {
        this.viewStartTime = time;
        this.selectedTest.testStartTime = this.tConvert(time);
      } else {
        this.viewEndTime = time;
        this.selectedTest.testEndTime = this.tConvert(time);
      }
    });
  }

  //convert time into AM/PM format//
  tConvert(time) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    this.time = time.join("");
    return time.join("");
  }
}
