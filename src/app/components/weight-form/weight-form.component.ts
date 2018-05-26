import { Component, OnInit, ViewChild } from "@angular/core"
import { FlashMessagesService } from "angular2-flash-messages"
import { WeightService } from "../../services/weight.service"
import { Router } from "@angular/router"

import { Weight } from "../../models/Weight"
@Component({
  selector: "app-weight-form",
  templateUrl: "./weight-form.component.html",
  styleUrls: ["./weight-form.component.css"]
})
export class WeightFormComponent implements OnInit {
  weight: Weight = {
    date: "",
    weight: 0
  }

  @ViewChild("clientForm") form: any

  constructor(
    private flashMessage: FlashMessagesService,
    private weightService: WeightService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: Weight; valid: boolean }) {
    if (!valid) {
      this.flashMessage.show("Please fill out the form correctly", {
        cssClass: "alert-danger",
        timeout: 4000
      })
    } else {
      this.weightService.newWeight(value)
      this.flashMessage.show("New weight added", {
        cssClass: "alert-success",
        timeout: 4000
      })
      this.router.navigate(["/weight"])
    }
  }
}
