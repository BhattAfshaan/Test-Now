import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../shared/category.service';
import { Category} from '../../shared/categoty.model';
import { QuestionService } from '../../shared/question.service';
import { Question} from '../../shared/question1.model';
import { SubjectService } from '../../shared/subjectService';
import { Subject } from '../../shared/subjectModel';


@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  // public selectedquestion = new Question();
  public question = new Question();
  public subjects = [];
  constructor(private subjectService: SubjectService, private qservice: QuestionService, private router:Router) { }

  ngOnInit() {
    this.getSubjects();
  }

  getSubjects() {
    this.subjectService.getSubjects().
    subscribe(
      (data: Subject[]) => {
        this.subjects = data
      }, 
      error => console.error('Error', error)
    );
  }

  onSubmit(form: NgForm) {
    console.log(form.value)

   this.qservice.insertquestion(this.question).
   subscribe(
     data => console.log('Success', data),
     error => console.error('Error', error)
   );
   alert(' Data Saved Successfully ');
   this.router.navigateByUrl('userprofile/Viewq');
     
   }

}
