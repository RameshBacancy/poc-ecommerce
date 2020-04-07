import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {

  options: Object;
  constructor() {
    this.options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        width: 400,
        height: 300
      },
      title: {
        text: 'Market Traffic in January, 2018'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.percentage:.1f} %',
            distance:-50
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Referral',
          y: 34.7,
          // sliced: true,
          // selected: true
        }, {
          name: 'organic',
          y: 31.4
        }, {
          name: 'direct',
          y: 25.4
        }, {
          name: 'twitter',
          y: 3
        }, {
          name: 'menu',
          y: 2
        }, {
          name: 'Other',
          y: 3
        }]
      }]

    }
  }

}
