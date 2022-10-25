import { Component, OnInit } from '@angular/core';
import { Department } from '../../shared/departmentModel';
import { DepartmentService } from '../../shared/departmentService';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css']
})
export class ViewDepartmentComponent implements OnInit {
  departments: Department[]= []
  constructor(private departmentService:DepartmentService) { }

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

  deleteDepartment(id: string) {
    this.departmentService.deleteDepartmentByID(id).
    subscribe(
      (response) => {
      console.log(response)
      }, 
      error => console.error('Error', error)
    );
  }
  
 

}
