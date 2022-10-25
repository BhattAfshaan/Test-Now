import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../shared/courseService';
import { Course } from '../../shared/courseModel';
import { DepartmentService } from '../../shared/departmentService';
import { Department } from '../../shared/departmentModel';
import { SubjectService } from '../../shared/subjectService';
import { Subject } from '../../shared/subjectModel';
import { QuestionService } from '../../shared/question.service';
import { Question } from 'src/app/shared/question1.model';
import { NgForm } from '@angular/forms';
import { CustomDateService } from '../../shared/CustomDateService';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { Test } from '../../shared/testModel';
import { TestService } from '../../shared/testService';

@Component({
  selector: 'app-addtest',
  templateUrl: './addtest.component.html',
  styleUrls: ['./addtest.component.css']
})
export class AddtestComponent implements OnInit {
  courses:Course[]= []
  departments: Department[]= []
  subjects: Subject[]= []
  questions: Question[]= []
  test = new Test()
  selectedDepartmentID: string
  selectedCourseID: string
  selectedSubjectID: string
  showCourses: boolean = false
  showSubjects: boolean = false
  showSelection: boolean = true
  showExamDetails: boolean = false
  time: any;
  time24: any;
  examDate:string
  startTime: string
  endTime: string
  viewStartTime: any
  viewEndTime: any
  constructor(
    private departmentService: DepartmentService,
    private courseService: CourseService, 
    private subjectService: SubjectService,
    private atp: AmazingTimePickerService,
    private questionService: QuestionService,
    private customDateService: CustomDateService,
    private testService: TestService) { }

  ngOnInit() {
    this.getDepartments()
  }

  getDepartments() {
    this.departmentService.getDepartments().
    subscribe(
      (data: Department[]) => {
        this.departments = data
      }, 
      error => console.error('Error', error)
    );
  }

  onDepartmentChange(event: any) {
   this.showCourses = true
   this.selectedDepartmentID = event.target.value
   this.getCourses(this.selectedDepartmentID)
  }

  getCourses(id: string) {
    this.courseService.getCourses().
    subscribe(
      (data: Course[]) => {
        this.courses = data.filter((course) => course.departmentDetails._id == id)
      }, 
      error => console.error('Error', error)
    );
  }

  onCourseChange(event: any) {
    this.showSubjects = true
    this.selectedCourseID = event.target.value
    this.getSubjects(this.selectedCourseID)
   }

  getSubjects(id: string) {
    this.subjectService.getSubjects().
    subscribe(
      (data: Subject[]) => {
        this.subjects = data.filter((subject)=> subject.courseDetails._id == id)
      }, 
      error => console.error('Error', error)
    );
  }

  onSubmit(){
    if(this.selectedDepartmentID && this.selectedCourseID && this.selectedSubjectID) {
      this.showSelection = false
      this.showExamDetails = true
      this.getQuestionsBySelection()
    }
    
  }

  getQuestionsBySelection() {
    this.questionService.getquestion().
    subscribe(
      (data: Question[]) => {
         this.questions = data.filter((question)=> {
         return question.subjectDetails.courseDetails.departmentDetails._id == this.selectedDepartmentID &&
          question.subjectDetails.courseDetails._id == this.selectedCourseID &&
          question.subjectDetails._id == this.selectedSubjectID
        } )
        this.test.testQuestions = this.questions
      }, 
      error => console.error('Error', error)
    );
  }

  onDetailsSubmit(form:NgForm){
    this.test.testDate = this.getFormattedDate()
    console.log(this.test)
    this.testService.insertTest(this.test).
    subscribe(
      (data) => {
        console.log(data)
      }, 
      error => console.error('Error', error)
    );
  }

  getFormattedDate(): string {
    return this.customDateService.toModel(this.test.testDate as any)
  }

 //handle time picker//
 open(type:string) {
   const amazingTimePicker = this.atp.open()
    amazingTimePicker.afterClose().subscribe(time => {
    this.time24 = time;
    if(type == 'startTime') {
      this.viewStartTime = time
      this.test.testStartTime = this.tConvert(time);
    }
    else {
      this.viewEndTime = time
      this.test.testEndTime = this.tConvert(time);
    }
  })
}

  //convert time into AM/PM format//
  tConvert (time) {
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    this.time=time.join('')
    return time.join (''); 
  }
}
