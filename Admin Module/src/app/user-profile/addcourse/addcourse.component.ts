import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseService } from '../../shared/courseService';
import { Course } from '../../shared/courseModel';
import { Router } from '@angular/router';
import { DepartmentService } from '../../shared/departmentService';
import { Department } from '../../shared/departmentModel';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {
  departments: Department[]= []
  public course =new Course()
  constructor(private courseService: CourseService, private router: Router, private departmentService: DepartmentService) { }

  ngOnInit() {
    this.getDepartments()
  }

  onDepartmentChange(event: any){
    console.log(event)
  }

  getDepartments() {
    this.departmentService.getDepartments().
    subscribe(
      (data: Department[]) => {
        console.log(data)
        this.departments = data
      }, 
      error => console.error('Error', error)
    );
  }
  onSubmit(form: NgForm) {
    console.log(form)
    console.log(this.course)
  //   if (form.value._id === '' || form.value._id == null) {
   this.courseService.insertCourse(this.course).
   subscribe(
     data => console.log('Success', data),
     error => console.error('Error', error)
   );
  //  alert(' Data Saved Successfully ');
  // //  this.router.navigateByUrl('userprofile/ViewCategory');
  //   } else {
  //     console.log(form.value);
  //   }
   }

}
