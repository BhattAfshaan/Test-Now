import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Department } from "../../shared/departmentModel";
import { DepartmentService } from "../../shared/departmentService";
import { UserService } from "../../shared/user.service";
import { Course } from "../../shared/courseModel";
import { CourseService } from "../../shared/courseService";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  departments: Department[] = [];
  courses: Course[] = [];

  constructor(
    public userService: UserService,
    private departmentService: DepartmentService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe((res) => {
      this.departments = res as Department[];
      this.getCourses();
    });
  }

  getCourses() {
    this.courseService.getCourses().subscribe((res) => {
      this.courses = res as Course[];
    });
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      (res) => {
        this.showSucessMessage = true;
        setTimeout(() => (this.showSucessMessage = false), 4000);
        this.resetForm(form);
      },
      (err) => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join("<br/>");
        } else {
          this.serverErrorMessages =
            "Something went wrong.Please contact admin.";
        }
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      department: "",
      course: "",
      fullName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    };
    form.resetForm();
    this.serverErrorMessages = "";
  }
}
