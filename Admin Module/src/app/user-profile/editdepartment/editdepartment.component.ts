import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../shared/alertService';
import { Department } from '../../shared/departmentModel';
import { DepartmentService } from '../../shared/departmentService';

@Component({
  selector: 'app-editdepartment',
  templateUrl: './editdepartment.component.html',
  styleUrls: ['./editdepartment.component.css']
})
export class EditdepartmentComponent implements OnInit {

  public selectedDepartment = new Department();
  public id = '';
  constructor(private route: ActivatedRoute, private router: Router, private departmentService: DepartmentService,private alertService: AlertService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDepartmentByID(this.id);
  }
  getDepartmentByID(id) {
      this.departmentService.getDepartmentByID(id).subscribe((res) => {
        this.selectedDepartment = res as Department;
        console.log(this.selectedDepartment);
      }, (err) => {
        console.log(err);
      });
  }
  onEdit(form: NgForm) {
    this.alertService.showSuccessAlert(() => {
      this.departmentService.updateDepartment(form.value).subscribe((res) => {
        console.log(res);
      });
      this.router.navigateByUrl('userprofile/ViewDepartment');
    },false)
    // if (confirm('Are you sure to Update this record ?') === true) {
     
    // } else {
    //   this.router.navigate ( [ '/EditDepartment', this.id ] );
    //   this.refresh();
    // }
    }

    refresh() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getDepartmentByID(this.id);
    }

}
