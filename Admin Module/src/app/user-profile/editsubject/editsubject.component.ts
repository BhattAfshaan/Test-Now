import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../../shared/subjectService';
import { Subject } from '../../shared/subjectModel';
import { NgForm } from '@angular/forms';
import { CourseService } from '../../shared/courseService';
import { Course } from '../../shared/courseModel';
import { AlertService } from '../../shared/alertService';

@Component({
  selector: 'app-editsubject',
  templateUrl: './editsubject.component.html',
  styleUrls: ['./editsubject.component.css']
})
export class EditsubjectComponent implements OnInit {

  public selectedSubject = new Subject();
  courses: Course[]= []
  public id = '';
  constructor(private route: ActivatedRoute, private router: Router,
     private alertService: AlertService,
     private subjectService: SubjectService, private courseService: CourseService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSubjectByID(this.id);
  }

  
  getSubjectByID(id) {
      this.subjectService.getSubjectByID(id).subscribe((res) => {
        this.selectedSubject = res as Subject;
        this.getCourses()
        console.log(this.selectedSubject);
      }, (err) => {
        console.log(err);
      });
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
  onEdit(form: NgForm) {
    console.log(form.value)
    this.alertService.showSuccessAlert(() => {
      this.subjectService.updateSubject(form.value).subscribe((res) => {
        console.log(res);
      });
      this.router.navigateByUrl('userprofile/ViewSubject');
    },false)
    // if (confirm('Are you sure to Update this record ?') === true) {
    //   this.subjectService.updateSubject(form.value).subscribe((res) => {
    //     console.log(res);
    //   });
    //   this.router.navigateByUrl('userprofile/ViewSubject');
    // } else {
    //   this.router.navigate ( [ '/EditSubject', this.id ] );
    //   this.refresh();
    // }
    }
    refresh() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getSubjectByID(this.id);
    }

}
