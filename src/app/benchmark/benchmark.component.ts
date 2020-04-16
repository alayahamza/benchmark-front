import {Component, Inject, OnInit} from '@angular/core';
import {BenchmarkService} from '../core/benchmark.service';
import {APP_BASE_HREF} from '@angular/common';
import {Data} from '../core/model/data';
import {Color} from 'ng2-charts';

@Component({
  selector: 'app-benchmark',
  templateUrl: './benchmark.component.html',
  styleUrls: ['./benchmark.component.scss']
})
export class BenchmarkComponent implements OnInit {

  baseHref;
  awake: boolean;

  displayUploadResultButton = true;
  displayCharts = false;
  displayProgressBar = false;
  companyChart: any;
  sectionCharts = [];
  datas: Data[];
  companies: string[];

  constructor(@Inject(APP_BASE_HREF) baseHref: string, private benchmarkService: BenchmarkService) {
    this.baseHref = baseHref;
  }

  ngOnInit(): void {
    this.isAwake();
  }

  uploadFile(event) {
    this.displayProgressBar = true;
    this.displayUploadResultButton = false;
    this.benchmarkService.uploadFile(event.target.files.item(0)).subscribe((data) => {
      this.datas = data;
      this.extractCompanies();
      this.extractSectionChartData();
      this.extractSubSectionData();
      this.displayProgressBar = false;
      this.displayCharts = true;
    }, error => console.error(error));
  }


  isAwake() {
    this.benchmarkService.isAwake().subscribe((data) => {
      this.awake = data;
    });
  }

  reset() {
    this.isAwake();
    this.displayUploadResultButton = true;
    this.displayProgressBar = false;
    this.displayCharts = false;
    this.companyChart = [];
    this.sectionCharts = [];
  }

  private extractSectionChartData() {
    this.companyChart = {};
    const sectionChartData = [];
    const sectionNames = [];
    this.datas[0].sections.forEach(section => sectionNames.push(section.name));
    this.datas.forEach((value) => {
      const sections = [];
      value.sections.forEach(sec => {
        sections.push(sec.average);
      });
      sectionChartData.push({
        data: sections, label: value.company
      });
    });
    this.companyChart = {
      chartType: 'radar',
      chartLabels: sectionNames,
      chartData: sectionChartData,
    };
  }

  private extractSubSectionData() {
    const chartColors = this.generateColors(this.companies.length);
    this.sectionCharts = [];
    let chart = {chartType: '', section: '', chartLabels: [], chartData: [], colors: []};
    let singleChartData = {data: [], label: ''};
    this.datas[0].sections.forEach(sec => {
      chart = {
        chartType: 'radar', section: sec.name, chartLabels: [], chartData: [], colors: chartColors
      };
      sec.subsections.forEach(sub => {
        chart.chartLabels.push(sub.name);
      });
      this.sectionCharts.push(chart);
    });
    this.sectionCharts.forEach((sectionChart, sectionChartIndex) => {
      this.datas.forEach((data, dataIndex) => {
        singleChartData = {data: [], label: data.company};
        data.sections[sectionChartIndex].subsections.forEach((subsection, subsectionIndex) => {
          singleChartData.data.push(subsection.average);
        });
        sectionChart.chartData.push(singleChartData);
      });
    });
  }

  private extractCompanies() {
    this.companies = [];
    this.datas.forEach(data => this.companies.push(data.company));
  }

  generateColors(size: number): Color[] {
    const colors = [];
    for (let counter = 0; counter < size; counter++) {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      colors.push({
        backgroundColor: 'rgb(' + r + ',' + g + ',' + b + ',' + 0.4 + ')',
        pointBackgroundColor: 'rgb(' + r + ',' + g + ',' + b + ',' + 1 + ')',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(' + r + ',' + g + ',' + b + ',' + 1 + ')',
        borderColor: 'rgb(' + r + ',' + g + ',' + b + ',' + 0.8 + ')'
      });
    }
    return colors;
  }
}
