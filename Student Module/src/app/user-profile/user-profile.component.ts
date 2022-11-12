import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";
import { UserDetails } from "../shared/user.model";

import { AlertService } from "../shared/alertService";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  userDetails: UserDetails;
  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getCurrenUserProfile();
  }

  getCurrenUserProfile() {
    this.userService.getUserProfile().subscribe(
      (response: any) => {
        if (response) {
          this.userDetails = response["reguser"];
        } else {
          this.alertService.showErrorAlert();
        }
      },
      (_error) => {
        this.alertService.showErrorAlert();
      }
    );
  }

  viewScheduledTests() {
    this.router.navigate(["/userprofile/scheduled-tests"]);
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(["/login"]);
  }
}
