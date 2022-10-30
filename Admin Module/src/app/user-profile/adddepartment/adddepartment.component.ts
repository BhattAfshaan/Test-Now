import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alertService';
import { Department } from 'src/app/shared/departmentModel';

import { DepartmentService } from '../../shared/departmentService';


@Component({
  selector: 'app-adddepartment',
  templateUrl: './adddepartment.component.html',
  styleUrls: ['./adddepartment.component.css']
})
export class AdddepartmentComponent implements OnInit {
  public department = new Department()
  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
   this.departmentService.insertDepartment(this.department).subscribe(
     (response) => {
      if(response) {
        this.alertService.showSuccessAlert(() => {
          this.router.navigateByUrl('userprofile/ViewDepartment')
        },true)
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
