import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { QuestionService } from "../../shared/question.service";
import { Question } from "../../shared/question1.model";
import { SubjectService } from "../../shared/subjectService";
import { Subject } from "../../shared/subjectModel";
import { AlertService } from "../../shared/alertService";

@Component({
  selector: "app-addquestion",
  templateUrl: "./addquestion.component.html",
  styleUrls: ["./addquestion.component.css"],
})
export class AddquestionComponent implements OnInit {
  public question = new Question();
  public subjects = [];
  constructor(
    private subjectService: SubjectService,
    private qservice: QuestionService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getSubjects();
  }

  getSubjects() {
    this.subjectService.getSubjects().subscribe(
      (response: Subject[]) => {
        if (response && response.length > 0) {
          this.subjects = response;
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
    this.qservice.insertquestion(this.question).subscribe(
      (response) => {
        if (response) {
          this.alertService.showSuccessAlert(() => {
            this.router.navigateByUrl("userprofile/Viewq");
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
