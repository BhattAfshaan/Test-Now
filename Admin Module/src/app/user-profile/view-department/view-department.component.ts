import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Strings } from 'src/app/Strings';

import { AlertService } from '../../shared/alertService';
import { Department } from '../../shared/departmentModel';
import { DepartmentService } from '../../shared/departmentService';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css']
})
export class ViewDepartmentComponent implements OnInit {
  departments: Department[]= []
  constructor(private departmentService:DepartmentService,private alertService: AlertService,private router: Router,private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.getDepartments()
  }
  getDepartments() {
    // this.ngxService.start();
    this.departmentService.getDepartments().
    subscribe(
      (data: Department[]) => {
        // this.ngxService.stop();
        this.departments = data
      }, 
      error => console.error('Error', error)
    );
  }

  deleteDepartment(id: string) {
    this.departmentService.deleteDepartmentByID(id).
    subscribe(
      (response) => {
        if(response) {
          this.alertService.showSuccessAlert(() => {
            this.getDepartments()
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
