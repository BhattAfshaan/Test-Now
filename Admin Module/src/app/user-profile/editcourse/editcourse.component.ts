import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CourseService } from "../../shared/courseService";
import { Course } from "../../shared/courseModel";
import { DepartmentService } from "../../shared/departmentService";
import { Department } from "../../shared/departmentModel";
import { AlertService } from "../../shared/alertService";

@Component({
  selector: "app-editcourse",
  templateUrl: "./editcourse.component.html",
  styleUrls: ["./editcourse.component.css"],
})
export class EditcourseComponent implements OnInit {
  public selectedCourse = new Course();
  public selectedDepartment = new Department();
  departments: Department[] = [];
  public selectedCourseID: string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    public departmentService: DepartmentService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.selectedCourseID = this.route.snapshot.paramMap.get("id");
    this.getCourseByID();
  }

  getCourseByID() {
    this.courseService.getCourseByID(this.selectedCourseID).subscribe(
      (response: Course) => {
        if (response) {
          this.selectedCourse = response;
          this.getDepartments();
        }
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe(
      (response: Department[]) => {
        if (response) {
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

  onDepartmentChange(departmentID: string) {
    this.selectedCourse.departmentDetails = this.departments.filter(
      (item) => item._id == departmentID
    )[0];
  }

  onEdit() {
    this.courseService.updateCourse(this.selectedCourse).subscribe(
      (response) => {
        if (response) {
          this.alertService.showSuccessAlert(() => {
            this.router.navigateByUrl("userprofile/ViewCourse");
          }, true);
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
