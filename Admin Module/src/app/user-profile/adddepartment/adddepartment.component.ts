import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/shared/departmentModel';
import { DepartmentService } from 'src/app/shared/departmentService';

@Component({
  selector: 'app-adddepartment',
  templateUrl: './adddepartment.component.html',
  styleUrls: ['./adddepartment.component.css']
})
export class AdddepartmentComponent implements OnInit {
  public department = new Department();
  constructor(private departmentService: DepartmentService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    console.log(form)
    console.log(this.department)
  //   if (form.value._id === '' || form.value._id == null) {
   this.departmentService.insertDepartment(this.department).
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
