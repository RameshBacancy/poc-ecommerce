import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-line-chart',
  templateUrl: './multi-line-chart.component.html',
  styleUrls: ['./multi-line-chart.component.scss']
})
export class MultiLineChartComponent implements OnInit {
  options: Object;
  constructor() { 
    this.options = {
      title: { text: '' },
      pointStart: 'Jan',
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        title: {
            text: 'Exchange rate'
        }
    },
      chart:{
        height: 300,
        width: 400
      },
      series: [{
        name: 'Rob',
        data: [4.5, 2.5, 3.5, 5]
      }, {
        name: 'Bob',
        data: [2.5, 4.5, 2, 2.9]
      }, {
        name: 'Martin',
        data: [2, 2, 3, 5]
      }],


    }
  }

  ngOnInit() {
  }

}
