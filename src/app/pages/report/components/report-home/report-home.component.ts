import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service'

import * as CanvasJS from '../../../../../assets/js/canvasjs.min';


@Component({
  selector: 'app-report-home',
  templateUrl: './report-home.component.html',
  styleUrls: ['./report-home.component.scss']
})
export class ReportHomeComponent implements OnInit {

  constructor(
    private reportService: ReportService
  ) { }
  barChartLabels = [];
  listDataSale = [];
  doughnutChartPlugins: any;
  barChartData = [
    { data: this.listDataSale = [] },
  ];
  ngOnInit() {
    let today = new Date().toISOString().slice(0, 10)
    this.toDate = today;
    let aWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    this.fromDate = aWeekAgo;
    this.onLoadReportKPI(0, 0);
    this.getListReportArea();
    this.getDateAndData();
  }

  fromDate: any;
  toDate: any;
  model: any;
  TotalRevenue: number;
  reportArea: any;
  reportRevenueBySources: any;
  reportAccumulationRevenues: any;
  reportAverageCustomerCycle: any;
  branchLabels: any = [];
  SaiGonRevenue: any = [];
  HanoiRevenue: any = [];
  AccumulationRevenue: any = [];
  branchName: string = 'Hà Nội';

  branchDatasets = [
    { "data": this.HanoiRevenue },
    { "data": this.SaiGonRevenue },
    {
      "data": this.AccumulationRevenue, "type": "line",
      "fill": false
    },
  ]
  clickArea(area: string) {
    this.branchName = area;
    this.getDateAndData();
  }
  getDateAndData() {
    this.getListReportArea();
    this.getReportData();
    this.getListReportSale();
    this.getListRevenueBySources();
    this.getListReportAccumulationRevenues();
    this.getListAverageCustomerCycle();
    this.barChartLabels.splice(0);
    this.listDataSale.splice(0);
    this.branchLabels.splice(0);
    this.HanoiRevenue.splice(0);;
    this.SaiGonRevenue.splice(0);
    this.AccumulationRevenue.splice(0);
    // this.drawDonut(this.reportRevenueBySources);
  }
  getListAverageCustomerCycle() {
    this.reportService.listReportAverageCustomerCycle(this.fromDate, this.toDate, this.branchName).subscribe(data => {
      this.reportAverageCustomerCycle = data;
    });
  }

  getListReportAccumulationRevenues() {
    this.reportService.listReportAccumulationRevenues(this.fromDate, this.toDate, this.branchName).subscribe(data => {
      this.reportAccumulationRevenues = data;
      this.reportAccumulationRevenues.forEach(x => {
        this.branchLabels.push(x.Date);
        this.HanoiRevenue.push(x.HanoiRevenue);
        this.SaiGonRevenue.push(x.SaiGonRevenue);
        this.AccumulationRevenue.push(x.AccumulationRevenue);
      });
      console.log(this.reportAccumulationRevenues);
    }, (error) => {
      console.log(error);
    });
  }

  getListRevenueBySources() {
    this.reportService.listReportRevenueBySources(this.fromDate, this.toDate, this.branchName).subscribe(res => {
      this.reportRevenueBySources = res.map(x => {
        return {
          name: x.Name,
          y: x.Revenue
        }
      });
      this.drawDonut(this.reportRevenueBySources);

    }, (error) => {
      console.log(error);
    });
  }

  getListReportSale() {
    this.reportService.listReportSale(this.fromDate, this.toDate, this.branchName).subscribe(res => {
      this.model = res;
      for (let i = 0; i < this.model.length; i++) {
        this.barChartLabels.push(this.model[i].SaleName);
        this.listDataSale.push(this.model[i].Revenue);
      }

    }, (error) => {
      console.log(error);
    });
  }

  getListReportArea() {
    this.reportService.listReportArea(this.fromDate, this.toDate, this.branchName).subscribe(res => {
      this.reportArea = res;
      this.onLoadReportKPI(this.reportArea.TotalRevenue, this.reportArea.KPIRevenue);
    }, (error) => {
      console.log(error);
    });
  }

  getReportData() {
    this.reportService.getReport(null, null, null, null, null, null).subscribe(res => {
    })
  }

  // doanh thu theo khu vực
  // branchDatasets = [
  //   { "data": [3, 10, 12, 13, 14, 17, 25, 32, 45, 56, 76, 87] },
  //   { "data": [3, 6, 7, 9, 13, 15, 22, 32, 44, 25, 66, 33] },
  //   {
  //     "data": [5, 10, 12, 14, 19, 24, 28, 37, 45, 56, 88, 90], "type": "line",
  //     "fill": true
  //   },
  // ]
  // branchLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  branchOptions = {
    "legend": {
      "display": false,
    },
    "scales": {
      "yAxes": [{
        "ticks": {
          "beginAtZero": false
        }
      }],
      "xAxes": [{
        "ticks": {
          "min": "",
          "max": "",
        }
      }],
    }
  };

  //  doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  //  doughnutChartData = [
  //   [350, 450, 100],

  // ];
  //  doughnutChartType = 'doughnut';

  //bar chart


  // ***** doanh thu theo sale *****

  public barChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
  };
  // barChartLabels = [];
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];

  //  barChartData = [
  //   { data: [0.2, 0.3, 0.37, 0.5, 0.6, 0.7] },

  // ];




  drawDonut(value) {
    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,

      data: [{
        type: "doughnut",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {y}bn (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints:
          value
        // { y: 0.25, name: "Facebook" },
        // { y: 0.25, name: "REFER" },
        // { y: 0.94, name: "HOTLINE" },
        // { y: 1.98, name: "RETEN" },
      }]
    });
    chart.render();
  }

  //line Chart
  // doanh thu thực đạt so với KPI
  public lineChartData = [
    {
      data: [5, 10, 12, 14, 16, 19, 21, 25, 30, 35, 47, 55],
    },

  ];
  public lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  public lineChartOptions = {
    scaleShowVerticalLines: false,
    animation: false,
    scaledisplay: false,
    responsive: true,
    tooltips: { enabled: true },
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    }
  };

  public colors = [{ backgroundColor: "#8ae1c8" }]

  public lineChartLegend = false;

  public lineChartType = 'line';

  onLoadReportKPI(value, KPIRevenue) {

    this.doughnutChartPlugins = [{
      beforeDraw(chart) {

        const ctx = chart.ctx;
        //Get options from the center object in options
        const sidePadding = 60;
        const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2) - 20;

        //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        // const stringWidth = ctx.measureText(txt).width;
        // const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        // const widthRatio = elementWidth / stringWidth;
        // const newFontSize = Math.floor(30 * widthRatio);
        // const elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        const fontSizeToUse = 27;

        ctx.font = fontSizeToUse + 'px Arial';
        ctx.fillStyle = 'blue';

        // Draw text in center
        const num = new Intl.NumberFormat().format(value);
        ctx.fillText(num, centerX, centerY);


        const ctx2 = chart.ctx;
        const txt2 = '3,307.65 M';

        //Get options from the center object in options
        const sidePadding2 = 60;
        const sidePaddingCalculated2 = (sidePadding / 100) * (chart.innerRadius * 2)

        ctx2.textAlign = 'center';
        ctx2.textBaseline = 'middle';
        const centerX2 = ((chart.chartArea.left + chart.chartArea.right) / 2);
        const centerY2 = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

        //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        // const stringWidth = ctx.measureText(txt).width;
        // const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        // const widthRatio = elementWidth / stringWidth;
        // const newFontSize = Math.floor(30 * widthRatio);
        // const elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        const fontSizeToUse2 = 12;

        ctx2.font = fontSizeToUse2 + 'px Arial';
        ctx2.fillStyle = 'red';

        // Draw text in center
        const kpi = new Intl.NumberFormat().format(KPIRevenue);
        ctx2.fillText(`KPIs: ${kpi} (-12%)`, centerX2, centerY2);
      }
    }];
  }
}