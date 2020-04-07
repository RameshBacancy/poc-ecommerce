import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-single-line-chart',
  templateUrl: './single-line-chart.component.html',
  styleUrls: ['./single-line-chart.component.scss']
})
export class SingleLineChartComponent {
  options: Object;
  data = [[
		1167609600000,
		0.7537
	],
	[
		1167696000000,
		0.7537
	],
	[
		1167782400000,
		0.7559
	],
	[
		1167868800000,
		0.7631
	],
	[
		1167955200000,
		0.7644
	],
	[
		1168214400000,
		0.769
	],
	[
		1168300800000,
		0.7683
	],
	[
		1168387200000,
		0.77
	],
	[
		1168473600000,
		0.7703
	],
	[
		1168560000000,
		0.7757
	],
	[
		1168819200000,
		0.7728
	],
	[
		1168905600000,
		0.7721
	],
	[
		1168992000000,
		0.7748
	],
	[
		1169078400000,
		0.774
	],
	[
		1169164800000,
		0.7718
	],
	[
		1169424000000,
		0.7731
	],
	[
		1169510400000,
		0.767
	]
]
  constructor() {
   
    this.options = {
   
      chart: {
        zoomType: 'x',
        width: 700
    },
    title: {
        text: 'USD to EUR exchange rate over time'
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
            text: 'Exchange rate'
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
                    [0, Highcharts.getOptions().colors[0]],
                    // [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
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

    }

  }
}








// title: { text: '' },
// // pointStart: 'Jan',
// xAxis: {
//   categories: ['12:45 AM', '12:46 AM',
//     '12:47 AM',
//     '12:48 AM',
//     '12:49 AM',
//     '12:50 AM',
//     '12:51 AM',
//     '12:52 AM',
//     '12:53 AM',
//     '12:54 AM',
//     '12:55 AM',
//     '12:56 AM',
//     '12:57 AM',
//     '12:58 AM',
//     '12:59 AM',
//     '1:00 AM',
//     '1:01 AM',
//     '1:02 AM',
//     '1:03 AM',
//     '1:04 AM',
//     '1:05 AM',
//     '1:06 AM',
//     '1:07 AM',
//     '1:08 AM',
//     '1:09 AM',
//     '1:10 AM'
//   ]
// },

// chart: {
//   height: 500,
//   width: 700
// },
// series: [
//   // {
//   // name:'',
//   {
//     data: [
//       50, 40, 55, 35, 65, 33, 63, 56, 24, 26, 66, 36, 32, 65, 24, 63, 50, 63, 63, 36, 45, 56, 54, 53,
//     ]
//     //   data: [35,50,30,35,30,30,60,34,38,30,55,44.44,55,10,25,35,63,32,36,24,96]
//   }]

