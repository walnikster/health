import { passwordRetypeMatcher } from "./../../validators/equalsvalidator"
import { FlashMessagesService } from "angular2-flash-messages"
import { Router } from "@angular/router"
import { AuthService } from "../../services/auth.service"
import { Component, OnInit } from "@angular/core"
import {
  ValidatorFn,
  AbstractControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms"

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
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
      passwordgroup: this.fb.group(
        {
          password: [null, Validators.required],
          passwordRetype: [null, Validators.required]
        },
        { validator: passwordRetypeMatcher }
      )
    })
  }

  signup() {
    if (this.form.valid) {
      this.authService
        .register(
          this.form.value.username,
          this.form.get("passwordgroup.password").value
        )
        .then(res => {
          this.flashMessageService.show("You are now registered", {
            cssClass: "alert-success",
            timeout: 4000
          })
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
}
