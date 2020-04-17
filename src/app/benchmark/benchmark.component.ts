import {Component, Inject, OnInit} from '@angular/core';
import {BenchmarkService} from '../core/benchmark.service';
import {APP_BASE_HREF} from '@angular/common';
import {Data} from '../core/model/data';
import {RadialChartOptions} from 'chart.js';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  sectionChart: any;
  subSectionChart: any;
  datas: Data[];
  companies: string[];
  sectionColors: any[];
  subSectionColors: any[];

  constructor(@Inject(APP_BASE_HREF) baseHref: string, private benchmarkService: BenchmarkService,
              private snackBar: MatSnackBar) {
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
    }, error => {
      this.snackBar.open('Oups Something went wrong ! Please check your file !', '');
      console.error(error);
    });
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
    this.sectionChart = {};
    this.subSectionChart = {};
  }

  private extractSectionChartData() {
    this.sectionColors = [];
    this.sectionChart = {};
    const sectionChartData = [];
    const sectionNames = [];
    this.datas[0].sections.forEach(section => {
      sectionNames.push(section.name);
      this.sectionColors.push(this.generateColors());
    });
    this.datas.forEach((value) => {
      const sections = [];
      value.sections.forEach(sec => {
        sections.push(sec.average);
      });
      sectionChartData.push({
        data: sections, label: value.company
      });
    });
    const options: RadialChartOptions = {
      responsive: true,
      scale: {
        pointLabels: {
          fontColor: this.sectionColors,
          fontStyle: 'bold italic'
        },
      }
    };
    this.sectionChart = {
      chartType: 'radar',
      chartLabels: sectionNames,
      chartData: sectionChartData,
      chartOptions: options
    };
  }

  private extractSubSectionData() {
    this.subSectionColors = [];
    this.subSectionChart = {};
    const subSectionChartData = [];
    const subSectionNames = [];
    this.datas[0].sections.forEach((section, sectionIndex) => {
      const color = this.sectionColors[sectionIndex];
      section.subsections.forEach(subSection => {
        this.subSectionColors.push(color);
        subSectionNames.push(subSection.name);
      });
    });
    this.datas.forEach((company) => {
      const subSections = [];
      company.sections.forEach(sec => {
        sec.subsections.forEach(subsec => {
          subSections.push(subsec.average);
        });
      });
      subSectionChartData.push({
        data: subSections, label: company.company
      });
    });
    const options: RadialChartOptions = {
      responsive: true,
      scale: {
        pointLabels: {
          fontColor: this.subSectionColors,
          fontStyle: 'bold italic'
        },
      }
    };
    this.subSectionChart = {
      chartType: 'radar',
      chartLabels: subSectionNames,
      chartData: subSectionChartData,
      chartOptions: options
    };
  }

  private extractCompanies() {
    this.companies = [];
    this.datas.forEach(data => this.companies.push(data.company));
  }

  generateColors(): string {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ',' + 1 + ')';
  }

}
