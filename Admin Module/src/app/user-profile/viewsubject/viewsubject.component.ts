import { Component, OnInit } from "@angular/core";
import { SubjectService } from "../../shared/subjectService";
import { Subject } from "../../shared/subjectModel";
import { AlertService } from "../../shared/alertService";

@Component({
  selector: "app-viewsubject",
  templateUrl: "./viewsubject.component.html",
  styleUrls: ["./viewsubject.component.css"],
})
export class ViewsubjectComponent implements OnInit {
  subjects: Subject[] = [];
  searchText: any;
  constructor(
    private subjectService: SubjectService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getSubjects();
  }

  getSubjects() {
    this.subjectService.getSubjects().subscribe(
      (response: Subject[]) => {
        this.subjects = response;
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  deleteSubject(id: string) {
    this.subjectService.deleteSubjectByID(id).subscribe(
      (response) => {
        if (response) {
          this.alertService.showSuccessAlert(() => {
            this.getSubjects();
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
