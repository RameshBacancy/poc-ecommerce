import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-single-line-chart',
  templateUrl: './single-line-chart.component.html',
  styleUrls: ['./single-line-chart.component.scss']
})

export class SingleLineChartComponent {

  options: object;
  data = [
      [ 1167609600000, 0.7537 ],
      [ 1167696000000, 0.7537 ],
      [	1167782400000,	0.7559],
      [	1167868800000,	0.7631],
      [	1167955200000,	0.7644],
      [	1168214400000,	0.769],
      [	1168300800000,	0.7683],
      [	1168387200000,	0.77],
      [	1168473600000,	0.7703],
      [	1168560000000,	0.7757],
      [	1168819200000,	0.7728],
      [	1168905600000,	0.7721],
      [	1168992000000,	0.7748],
      [	1169078400000,	0.774],
      [	1169164800000,	0.7718],
      [	1169424000000,	0.7731],
      [ 1169510400000,  0.767]
  ];

  constructor() {
    this.options = {
      chart: {
        zoomType: 'x',
        width: 700
      },
      title: {
        text: ''
      },
subtitle: {
    text: document.ontouchstart === undefined ?
        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
},
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
        text: ''
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
          stops: [
            // [0, Highcharts.getOptions().colors[0]],
// [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).g('rgba')]
          ]
        },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },
      series: [{
        type: 'area',
        name: 'USD to EUR',
        data: this.data
      }]
    };
  }
}
