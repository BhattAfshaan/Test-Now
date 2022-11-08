import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { QuestionService } from "../../shared/question.service";
import { Question } from "../../shared/question1.model";
import { SubjectService } from "../../shared/subjectService";
import { Subject } from "../../shared/subjectModel";
import { AlertService } from "../../shared/alertService";

@Component({
  selector: "app-editquestion",
  templateUrl: "./editquestion.component.html",
  styleUrls: ["./editquestion.component.css"],
})
export class EditquestionComponent implements OnInit {
  public selectedQuestionID: string = "";
  public selectedQuestion = new Question();
  public subjects: Subject[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService,
    private questionService: QuestionService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.selectedQuestionID = this.route.snapshot.paramMap.get("id");
    this.getSubjects();
  }

  getSubjects() {
    this.subjectService.getSubjects().subscribe(
      (response: Subject[]) => {
        if (response && response.length > 0) {
          this.subjects = response;
          this.getQuestionByID();
        }
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  getQuestionByID() {
    this.questionService.getQuestionByID(this.selectedQuestionID).subscribe(
      (response: Question) => {
        if (response) {
          this.selectedQuestion = response;
        }
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  onSubjectChange(subjectID: string) {
    this.selectedQuestion.subjectDetails = this.subjects.filter(
      (item) => item._id == subjectID
    )[0];
  }

  onEdit() {
    this.questionService.updatequestion(this.selectedQuestion).subscribe(
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
