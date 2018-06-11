import { Component, OnInit } from "@angular/core"
import { FlashMessagesService } from "angular2-flash-messages"
import { WeightService } from "../../services/weight.service"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
@Component({
  selector: "app-weight-form",
  templateUrl: "./weight-form.component.html",
  styleUrls: ["./weight-form.component.css"]
})
export class WeightFormComponent implements OnInit {
  form: FormGroup

  constructor(
    private flashMessage: FlashMessagesService,
    private weightService: WeightService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const localDate = `${new Date().getDate()}.${new Date().getMonth() +
      1}.${new Date().getFullYear()}`

    this.form = this.fb.group({
      date: [localDate, Validators.required],
      weight: [90, [Validators.required, Validators.min(0)]]
    })
  }

  onSubmit() {
    if (!this.form.valid) {
      this.flashMessage.show("Please fill out the form correctly", {
        cssClass: "alert-danger",
        timeout: 4000
      })
    } else {
      this.weightService.newWeight(this.form.value)
      this.flashMessage.show("New weight added", {
        cssClass: "alert-success",
        timeout: 4000
      })
      this.form.reset()
    }
  }
}
