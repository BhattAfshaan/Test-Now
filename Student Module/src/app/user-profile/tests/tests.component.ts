import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Result } from '../../shared/result.model';
import { UserDetails } from '../../shared/user.model';
import { NgForm } from '@angular/forms';
import { ResultService } from '../../shared/result.service';
import { Question } from '../../shared/question.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  public category = '';
  userDetails:UserDetails;
  public questions : Question[]= [];
  public answer = new Result();
  // @Input() questions: [];
  constructor(private route: ActivatedRoute,private resservice: ResultService, private userService:UserService ) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    
      this.questions = JSON.parse(params["data"])
      console.log(this.questions)
    });
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['reguser'];
        console.log(this.userDetails);
      },
      err => {
        console.log(err);
      }
    );
  }

  onAnswer(form: NgForm) {
    this.answer.email = this.userDetails.email;
    this.answer.qid = form.value.qid;
    this.answer.uanswer = form.value.uanswer;
    this.answer.canswer = form.value.canswer;
    this.answer.marks = (form.value.uanswer === form.value.canswer) ? form.value.marks : 0;
    this.answer.category_id = form.value.category_id;
    this.resservice.insertans(this.answer).
    subscribe(
      data => console.log('Success', data),
      error => console.error('Error', error)
    ) ;
  }

}
