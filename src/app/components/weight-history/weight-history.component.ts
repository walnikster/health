import { Component, OnInit } from "@angular/core";
import { Weight } from "../../models/Weight";
import { WeightService } from "../../services/weight.service";

@Component({
  selector: "app-weight-history",
  templateUrl: "./weight-history.component.html",
  styleUrls: ["./weight-history.component.css"]
})
export class WeightHistoryComponent implements OnInit {
  weights: Weight[];
  constructor(private weightService: WeightService) {}

  ngOnInit() {
    this.weightService.getWeights().subscribe(weights => {
      this.weights = weights;
    });
  }

  deleteItem(id: string) {
    this.weightService.deleteWeight(id);
  }
}
