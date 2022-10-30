import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../shared/courseService';
import { Course } from '../../shared/courseModel';
import { AlertService } from '../../shared/alertService';

@Component({
  selector: 'app-viewcourse',
  templateUrl: './viewcourse.component.html',
  styleUrls: ['./viewcourse.component.css']
})
export class ViewcourseComponent implements OnInit {
  courses: Course[]= []
  constructor(private courseService: CourseService, private alertService: AlertService) { }

  ngOnInit() {
    this.getCourses()
  }
  
  getCourses() {
    this.courseService.getCourses().
    subscribe(
      (data: Course[]) => {
        this.courses = data
      }, 
      error => console.error('Error', error)
    )
  }

  deleteCourse(id: string) {
  this.courseService.deleteCourseByID(id).
  subscribe(
    (response) => {
    if(response) {
      this.alertService.showSuccessAlert(() => {
        this.getCourses()
      },false)
    }
    else {
      this.alertService.showErrorAlert()
    }
    }, 
    (_error) => {
    this.alertService.showErrorAlert()
    })
  }
  
 
}
