import {Component, Input, OnInit} from '@angular/core';
import {RadialChartOptions} from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() public chartLabels;
  @Input() public chartData;
  @Input() public chartType;
  @Input() public chartColors;
  public chartOptions: RadialChartOptions = {
    responsive: true,
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
