import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../../shared/alertService";
import { Department } from "../../shared/departmentModel";
import { DepartmentService } from "../../shared/departmentService";

@Component({
  selector: "app-editdepartment",
  templateUrl: "./editdepartment.component.html",
  styleUrls: ["./editdepartment.component.css"],
})
export class EditdepartmentComponent implements OnInit {
  public selectedDepartment = new Department();
  public selectedDepartmentID: string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.selectedDepartmentID = this.route.snapshot.paramMap.get("id");
    this.getDepartmentByID();
  }

  getDepartmentByID() {
    this.departmentService
      .getDepartmentByID(this.selectedDepartmentID)
      .subscribe(
        (response) => {
          if (response) {
            this.selectedDepartment = response as Department;
          }
        },
        (_error) => {
          this.alertService.showErrorAlert();
        }
      );
  }

  onEdit() {
    this.departmentService.updateDepartment(this.selectedDepartment).subscribe(
      (response) => {
        if (response) {
          this.alertService.showSuccessAlert(() => {
            this.router.navigateByUrl("userprofile/ViewDepartment");
          }, true);
        } else {
          this.alertService.showErrorAlert();
        }
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }
}
