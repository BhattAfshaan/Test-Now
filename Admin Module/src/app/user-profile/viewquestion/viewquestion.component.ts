import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService } from "../../shared/alertService";
import { QuestionService } from "../../shared/question.service";
import { Question } from "../../shared/question1.model";

@Component({
  selector: "app-viewquestion",
  templateUrl: "./viewquestion.component.html",
  styleUrls: ["./viewquestion.component.css"],
})
export class ViewquestionComponent implements OnInit {
  public questions: Question[] = [];
  constructor(
    private router: Router,
    private qservice: QuestionService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.qservice.getQuestions().subscribe(
      (response: Question[]) => {
        this.questions = response as Question[];
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  onDelete(questionID: string) {
    this.qservice.deletequestion(questionID).subscribe(
      (response) => {
        if (response) {
          this.alertService.showSuccessAlert(() => {
            this.getQuestions();
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
