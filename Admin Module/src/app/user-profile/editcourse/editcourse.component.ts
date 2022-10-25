import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../shared/courseService';
import { Course } from '../../shared/courseModel';
import { NgForm } from '@angular/forms';
import { DepartmentService } from '../../shared/departmentService';
import { Department } from '../../shared/departmentModel';

@Component({
  selector: 'app-editcourse',
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.css']
})
export class EditcourseComponent implements OnInit {

  public selectedCourse= new Course();
  public selectedDepartment= new Department();
  departments:Department[]= []
  public id = '';
  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService, public departmentService:DepartmentService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCourseByID(this.id);
  }
  
  getCourseByID(id) {
      this.courseService.getCourseByID(id).subscribe((res) => {
        if(res) {
          this.selectedCourse = res as Course;
          console.log(this.selectedCourse);
          this.getDepartments()
        }
  
      }, (err) => {
        console.log(err);
      });
  }
  getDepartments() {
    this.departmentService.getDepartments().subscribe((res:Department[]) => {
      console.log(res)
      this.departments = res
      // this.selectedDepartment = this.departments.filter((item)=> item._id == this.selectedCourse.departmentDetails._id)[0]
      // console.log(this.selectedDepartment)
      // this.selectedDepartment = res as Department;
      // console.log(this.selectedDepartment);
    }, (err) => {
      console.log(err);
    });
}
  onEdit(form: NgForm) {
    if (confirm('Are you sure to Update this record ?') === true) {
      this.courseService.updateCourse(form.value).subscribe((res) => {
        console.log(res);
      });
      this.router.navigateByUrl('userprofile/ViewCourse');
    } else {
      this.router.navigate ( [ '/EditCourse', this.id ] );
      this.refresh();
    }
    }
    refresh() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getCourseByID(this.id);
    }


}
