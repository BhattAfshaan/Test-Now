import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SubjectService } from "../../shared/subjectService";
import { Subject } from "../../shared/subjectModel";
import { CourseService } from "../../shared/courseService";
import { Course } from "../../shared/courseModel";
import { AlertService } from "../../shared/alertService";

@Component({
  selector: "app-addsubject",
  templateUrl: "./addsubject.component.html",
  styleUrls: ["./addsubject.component.css"],
})
export class AddsubjectComponent implements OnInit {
  courses: Course[] = [];
  public subject = new Subject();
  constructor(
    private subjectService: SubjectService,
    private router: Router,
    private courseService: CourseService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.courseService.getCourses().subscribe(
      (response: Course[]) => {
        if (response && response.length > 0) {
          this.courses = response;
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
    this.subjectService.insertSubject(this.subject).subscribe(
      (response) => {
        if (response) {
          this.alertService.showSuccessAlert(() => {
            this.router.navigateByUrl("userprofile/ViewSubject");
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
