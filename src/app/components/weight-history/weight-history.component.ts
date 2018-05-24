import { Component, OnInit } from "@angular/core"
import { Weight } from "../../models/Weight"
import { WeightService } from "../../services/weight.service"

@Component({
  selector: "app-weight-history",
  templateUrl: "./weight-history.component.html",
  styleUrls: ["./weight-history.component.css"]
})
export class WeightHistoryComponent implements OnInit {
  weights: Weight[]
  firstdate: string
  difference: string

  type: string
  data: any
  options: any
  loading: boolean = false

  constructor(private weightService: WeightService) {}

  ngOnInit() {
    this.loading = true
    this.weightService.getWeights().subscribe(weights => {
      this.weights = weights
      this.firstdate = weights[weights.length - 1].date
      let firstWeight = weights[weights.length - 1].weight
      let lastWeight = weights[0].weight
      this.difference = (lastWeight - firstWeight).toFixed(2)
      let chartWeights = weights.slice().reverse()
      this.loading = false
      this.data = {
        labels: chartWeights.map(a => a.date.toLocaleString()),
        datasets: [
          {
            data: chartWeights.map(a => a.weight),
            borderColor: "#0069d9"
          }
        ]
      }
    })

    this.type = "line"
    this.options = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              parser: "YYYY-MM-DD",
              unit: "day",
              displayFormats: {
                day: "DD-MMM"
              }
            },
            distribution: "series"
          }
        ]
      },
      responsive: true
    }
  }

  showdata() {
    console.log(this.data)
  }

  deleteItem(id: string) {
    this.weightService.deleteWeight(id)
  }
}
