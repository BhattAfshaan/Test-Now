import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/shared/question1.model';

@Component({
  selector: 'app-scheduled-test-questions',
  templateUrl: './scheduled-test-questions.component.html',
  styleUrls: ['./scheduled-test-questions.component.css']
})
export class ScheduledTestQuestionsComponent implements OnInit {
   questions:Question[]=[]
   maxMarks: number = 0
   minMarks: number = 0
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.getQuestions()
  }

  getQuestions() {
    this.route.queryParams.subscribe(params => {
      this.questions = JSON.parse(params["data"])
      this.getTotalMarks()
      // this.getMinMarks()
    })
  }

  getTotalMarks() {
    this.maxMarks = this.questions.reduce((total, current) =>  total + parseInt(current.marks) , 0)
  }

  // getMinMarks() {
  //   this.minMarks = 33/this.maxMarks * 100
  //   console.log(this.minMarks)


  // }

}
