import { Component, OnInit } from '@angular/core'
import { Weight } from '../../models/Weight'
import { WeightService } from '../../services/weight.service'
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'app-weight-history',
  templateUrl: './weight-history.component.html',
  styleUrls: ['./weight-history.component.css']
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
      if (weights && weights.length > 0) {
        this.firstdate = weights[weights.length - 1].date
        let firstWeight = weights[weights.length - 1].weight
        let lastWeight = weights[0].weight
        this.difference = (lastWeight - firstWeight).toFixed(2)
      }
      let chartWeights = weights.slice().reverse()
      this.loading = false

      let points = []

      chartWeights.forEach(a =>
        points.push({ x: new Date(a.date), y: a.weight })
      )

      this.data = {
        labels: chartWeights.map(a => new Date(a.date)),
        datasets: [
          {
            data: points,
            borderColor: '#0069d9'
          }
        ]
      }
    })

    this.type = 'line'
    this.options = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            distribution: 'series',
            bounds: 'data',
            ticks: {
              source: 'data',
              maxRotation: 0,
              maxTicksLimit: 4,
              autoSkip: true
            }
          }
        ]
      },
      responsive: true
    }
  }

  showdata() {
    console.log(this.data)
  }

  showJson() {
    return JSON.stringify(this.weights)
  }

  deleteItem(id: string) {
    this.weightService.deleteWeight(id)
  }
}
