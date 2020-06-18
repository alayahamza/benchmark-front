import {Component, Inject, OnInit} from '@angular/core';
import {BenchmarkService} from '../core/benchmark.service';
import {APP_BASE_HREF} from '@angular/common';
import {Data} from '../core/model/data';
import {RadialChartOptions} from 'chart.js';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Colors} from '../core/model/colors';

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
    // this.datas.forEach(data => {
    //   data.sections.forEach((section, sectionIndex) => {
    //     if (sectionNames.indexOf(section.name) === -1) {
    //       sectionNames.push(section.name);
    //       this.sectionColors.push(Colors.list[sectionIndex]);
    //     }
    //   });
    // });
    this.datas.forEach((data) => {
      const sections = [];
      data.sections.forEach((sec, secIndex) => {
        if (sectionNames.indexOf(sec.name) === -1) {
          sectionNames.push(sec.name);
          this.sectionColors.push(Colors.list[secIndex]);
        }
        sections.push(sec.average.toFixed(2));
      });
      sectionChartData.push({
        data: sections, label: data.company
      });
    });
    const options: RadialChartOptions = {
      responsive: true,
      scale: {
        pointLabels: {
          fontColor: this.sectionColors,
          fontStyle: 'bold italic'
        },
        ticks: {
          max: 5,
          min: 0,
          stepSize: 0.5
        }
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
    this.datas.forEach(data => {
      data.sections.forEach((section, sectionIndex) => {
        const color = this.sectionColors[sectionIndex];
        section.subsections.forEach(subSection => {
          if (subSectionNames.indexOf(subSection.name) === -1) {
            this.subSectionColors.push(color);
            subSectionNames.push(subSection.name);
          }
        });
      });
    });
    this.datas.forEach((company) => {
      const subSections = [];
      company.sections.forEach(sec => {
        sec.subsections.forEach(subsec => {
          subSections.push(subsec.average.toFixed(2));
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
        ticks: {
          max: 5,
          min: 0,
          stepSize: 0.5
        }
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
