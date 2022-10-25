import { Component, OnInit } from '@angular/core';
import { TestService } from '../../shared/testService';
import { Test } from '../../shared/testModel';

@Component({
  selector: 'app-viewtest',
  templateUrl: './viewtest.component.html',
  styleUrls: ['./viewtest.component.css']
})
export class ViewtestComponent implements OnInit {

  tests: Test[]= []
  constructor(private testService:TestService) { }

  ngOnInit() {
    this.getTests()
  }
  getTests() {
    this.testService.getTests().
    subscribe(
      (data: Test[]) => {
        this.tests = data
      }, 
      error => console.error('Error', error)
    );
  }

  deleteTest(id: string) {
    this.testService.deleteTestByID(id).
    subscribe(
      (response) => {
      console.log(response)
      }, 
      error => console.error('Error', error)
    );
  }
}
