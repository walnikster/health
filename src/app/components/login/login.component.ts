import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(["/"]);
      }
    });
  }

  login() {
    this.authService
      .login(this.username, this.password)
      .then(res => {
        console.log(res);
        this.flashMessageService.show("You are now logged in", {
          cssClass: "alert-success",
          timeout: 4000
        });
        this.router.navigate(["/"]);
      })
      .catch(err => {
        console.log(err.message);
        this.flashMessageService.show(err.message, {
          cssClass: "alert-danger",
          timeout: 4000
        });
      });
  }
}
