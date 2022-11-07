import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CourseService } from "../../shared/courseService";
import { Course } from "../../shared/courseModel";
import { Router } from "@angular/router";
import { DepartmentService } from "../../shared/departmentService";
import { Department } from "../../shared/departmentModel";
import { AlertService } from "../../shared/alertService";

@Component({
  selector: "app-addcourse",
  templateUrl: "./addcourse.component.html",
  styleUrls: ["./addcourse.component.css"],
})
export class AddcourseComponent implements OnInit {
  departments: Department[] = [];
  public course = new Course();
  constructor(
    private courseService: CourseService,
    private router: Router,
    private departmentService: DepartmentService,
    private alertService: AlertService
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

  onSubmit(form: NgForm) {
    console.log(form);
    this.courseService.insertCourse(this.course).subscribe(
      (response) => {
        if (response) {
          this.alertService.showSuccessAlert(() => {
            this.router.navigateByUrl("userprofile/ViewCourse");
          }, true);
        } else {
          this.alertService.showErrorAlert();
          console.log("hi");
        }
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }
}
