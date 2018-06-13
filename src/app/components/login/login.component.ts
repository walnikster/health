import { Validators } from "@angular/forms"
import { FormGroup } from "@angular/forms"
import { FormBuilder } from "@angular/forms"
import { Component, OnInit, ViewChild } from "@angular/core"
import { AuthService } from "../../services/auth.service"
import { FlashMessagesService } from "angular2-flash-messages"
import { Router } from "@angular/router"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form: FormGroup

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessagesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(["/"])
      }
    })
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  login() {
    this.authService
      .login(this.form.value.username, this.form.value.password)
      .then(res => {
        this.flashMessageService.show("You are now logged in", {
          cssClass: "alert-success",
          timeout: 4000
        })
        this.router.navigate(["/"])
      })
      .catch(err => {
        console.log(err.message)
        this.flashMessageService.show(err.message, {
          cssClass: "alert-danger",
          timeout: 4000
        })
      })
  }
}
