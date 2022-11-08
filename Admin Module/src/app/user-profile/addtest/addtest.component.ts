import { Component, OnInit } from "@angular/core";
import { CourseService } from "../../shared/courseService";
import { Course } from "../../shared/courseModel";
import { DepartmentService } from "../../shared/departmentService";
import { Department } from "../../shared/departmentModel";
import { SubjectService } from "../../shared/subjectService";
import { Subject } from "../../shared/subjectModel";
import { QuestionService } from "../../shared/question.service";
import { Question } from "src/app/shared/question1.model";
import { NgForm } from "@angular/forms";
import { CustomDateService } from "../../shared/CustomDateService";
import { AmazingTimePickerService } from "amazing-time-picker";
import { Test } from "../../shared/testModel";
import { TestService } from "../../shared/testService";
import { Router } from "@angular/router";
import { AlertService } from "../../shared/alertService";

@Component({
  selector: "app-addtest",
  templateUrl: "./addtest.component.html",
  styleUrls: ["./addtest.component.css"],
})
export class AddtestComponent implements OnInit {
  courses: Course[] = [];
  departments: Department[] = [];
  subjects: Subject[] = [];
  questions: Question[] = [];
  test = new Test();
  selectedDepartmentID: string;
  selectedCourseID: string;
  selectedSubjectID: string;
  showCourses: boolean = false;
  showSubjects: boolean = false;
  showSelection: boolean = true;
  showExamDetails: boolean = false;
  isSubmitted: boolean = false;
  isDetailsSubmitted: boolean = false;
  time: any;
  time24: any;
  examDate: string;
  startTime: string;
  endTime: string;
  viewStartTime: any;
  viewEndTime: any;
  constructor(
    private departmentService: DepartmentService,
    private courseService: CourseService,
    private subjectService: SubjectService,
    private atp: AmazingTimePickerService,
    private questionService: QuestionService,
    private customDateService: CustomDateService,
    private router: Router,
    private alertService: AlertService,
    private testService: TestService
  ) {}

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe(
      (response: Department[]) => {
        if (response && response.length > 0) {
          this.departments = response;
        } else {
          this.alertService.showErrorAlert();
        }
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  onDepartmentChange(event: any) {
    this.isSubmitted = false;
    this.showCourses = true;
    this.selectedDepartmentID = event.target.value;
    this.getCourses(this.selectedDepartmentID);
  }

  getCourses(departmentID: string) {
    this.courseService.getCourses().subscribe(
      (response: Course[]) => {
        if (response && response.length > 0) {
          this.courses = response.filter(
            (course) => course.departmentDetails._id == departmentID
          );
        } else {
          this.alertService.showErrorAlert();
        }
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  onCourseChange(event: any) {
    this.isSubmitted = false;
    this.showSubjects = true;
    this.selectedCourseID = event.target.value;
    this.getSubjects(this.selectedCourseID);
  }

  getSubjects(courseID: string) {
    this.subjectService.getSubjects().subscribe(
      (response: Subject[]) => {
        if (response && response.length > 0) {
          this.subjects = response.filter(
            (subject) => subject.courseDetails._id == courseID
          );
        } else {
          this.alertService.showErrorAlert();
        }
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (
      this.selectedDepartmentID &&
      this.selectedCourseID &&
      this.selectedSubjectID
    ) {
      this.showSelection = false;
      this.showExamDetails = true;
      this.getQuestionsBySelection();
    }
  }

  getQuestionsBySelection() {
    this.questionService.getQuestions().subscribe(
      (response: Question[]) => {
        if (response && response.length > 0) {
          this.questions = response.filter((question) => {
            return (
              question.subjectDetails.courseDetails.departmentDetails._id ==
                this.selectedDepartmentID &&
              question.subjectDetails.courseDetails._id ==
                this.selectedCourseID &&
              question.subjectDetails._id == this.selectedSubjectID
            );
          });
          this.test.testQuestions = this.questions;
        } else {
          this.alertService.showErrorAlert();
        }
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  onDetailsSubmit(form: NgForm) {
    this.test.testDate = this.getFormattedDate();
    this.testService.insertTest(this.test).subscribe(
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
    return this.customDateService.toModel(this.test.testDate as any);
  }

  //handle time picker//
  open(type: string) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe((time) => {
      this.time24 = time;
      if (type == "startTime") {
        this.viewStartTime = time;
        this.test.testStartTime = this.tConvert(time);
      } else {
        this.viewEndTime = time;
        this.test.testEndTime = this.tConvert(time);
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
