import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SubjectService } from "../../shared/subjectService";
import { Subject } from "../../shared/subjectModel";
import { CourseService } from "../../shared/courseService";
import { Course } from "../../shared/courseModel";
import { AlertService } from "../../shared/alertService";

@Component({
  selector: "app-editsubject",
  templateUrl: "./editsubject.component.html",
  styleUrls: ["./editsubject.component.css"],
})
export class EditsubjectComponent implements OnInit {
  public selectedSubject = new Subject();
  courses: Course[] = [];
  public selectedSubjectId: string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private subjectService: SubjectService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.selectedSubjectId = this.route.snapshot.paramMap.get("id");
    this.getSubjectByID();
  }

  getSubjectByID() {
    this.subjectService.getSubjectByID(this.selectedSubjectId).subscribe(
      (response: Subject) => {
        if (response) {
          this.selectedSubject = response;
          this.getCourses();
        }
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
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

  onCourseChange(courseID: string) {
    this.selectedSubject.courseDetails = this.courses.filter(
      (item) => item._id == courseID
    )[0];
  }

  onEdit() {
    this.subjectService.updateSubject(this.selectedSubject).subscribe(
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
