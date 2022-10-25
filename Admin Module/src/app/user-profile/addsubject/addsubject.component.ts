import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from '../../shared/subjectService';
import { Subject } from '../../shared/subjectModel';
import { CourseService } from '../../shared/courseService';
import { Course } from '../../shared/courseModel';

@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent implements OnInit {
  courses:Course[]= []
  public subject = new Subject();
  constructor(private subjectService: SubjectService, private router: Router, private courseService:CourseService) { }

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
    );
  }
  onSubmit(form: NgForm) {
    console.log(form)
    console.log(this.subject)
  //   if (form.value._id === '' || form.value._id == null) {
   this.subjectService.insertSubject(this.subject).
   subscribe(
     data => console.log('Success', data),
     error => console.error('Error', error)
   );
   alert(' Data Saved Successfully ');
  // //  this.router.navigateByUrl('userprofile/ViewCategory');
  //   } else {
  //     console.log(form.value);
  //   }
   }


}
