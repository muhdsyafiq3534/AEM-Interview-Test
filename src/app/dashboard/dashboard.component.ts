import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardClient } from '../clients/dashboard.client';
import { AuthService } from '../services/auth.service';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';

export interface chartData {
  name: string
  value: number
}

export interface barData {
  name: string
  value: number
}

export interface barDetail {
  data: any
  label: any
}

export interface donutDetail {
  value: number
  name: string

}

export interface table {
  firstName: any
  lastName: any
  username: any
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public dashboard: Observable<any> = this.DashboardClient.getDashboardData();

  @ViewChild('barCanvas') barCanvas: ElementRef | undefined;
  barChart: any;


  test1: any
  donut1: donutDetail[] = []
  donutName: any[] = []
  donutValue: any[] = []
  barName: barDetail[] = []
  users: table[] = []
  dataSource: any
  displayedColumns: string[] = ["no","First Name", "Last Name", "User Name"];

  getDonut: any
  getDonutName: any[] = []
  getDonutValue: number[] = []

  getBar: any
  getBarName: any[] = []
  getBarValue: any[] = []

  constructor(
    private AuthService: AuthService,
    private DashboardClient: DashboardClient
  ) { }

  ngOnInit() {
    this.getData();
    this.getBarchart()
    this.getdoughnutChart()
  }

  ngAfterViewInit() {
  }

  logout(): void {
    this.AuthService.logout();
  }

  getData() {
    this.dashboard.subscribe(res => {
      this.test1 = res

      this.test1.chartDonut.forEach((x: chartData) => {
        this.donutName.push(x.name)
        this.donutValue.push(x.value)
      });

      this.test1.chartBar.forEach((x: chartData) => {
        let data = { data: [x.value], label: x.name }
        this.barName.push(data)
      });

      this.test1.tableUsers.forEach((x: table) => {
        let data = { firstName: x.firstName, lastName: x.lastName, username: x.username }
        this.users.push(data)
      });

      this.dataSource = this.users

    })
  }
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.donutName,
    datasets: [
      {
        data: this.donutValue,
        backgroundColor: ["red", "yellow", "blue", "purple"],
      },
    ]
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ["Barchart"],
    datasets: this.barName
  };


  ////////////////////////////////////

  getdoughnutChart() {
    this.dashboard.subscribe(res =>{
      this.getDonut = res
      this.getDonut.chartDonut.forEach((x: chartData) => {

        let data =  x.name
        this.getDonutName.push(data)

        //let data1 =  { x.value}
        this.getDonutValue.push(x.value)
      });
      //console.log(this.getDonutName,'name');
      //console.log(this.getDonutValue,'value');
      var myChart = new Chart("myChart1", {
        type: 'doughnut',
        data: {
          labels: this.getDonutName,
          datasets: [{
            data: this.getDonutValue
          }]
        },
        options: {
          responsive: true,
          layout: {
            autoPadding: true,
              padding: {
                  left: 0
              }
          }
      }
      });
    })

    //console.log(this.getDonutName,'name');
    //console.log(this.getDonutValue,'value');

  }

  getBarchart() {
    this.dashboard.subscribe(res =>{
      this.getBar = res

      this.getBar.chartBar.forEach((x: chartData) => {
        let data = { data: [x.value]}

        let data1 =[x.value]

        this.getBarName.push(x.name)
        this.getBarValue.push(x.value)
      });
      // console.log(this.getBarName,"name");
      // console.log(this.getBarValue,"data");

      var myChart = new Chart("myChart", {
        type: 'bar',
        data: {
          labels: this.getBarName,
          datasets: [{
            data: this.getBarValue,
            //label: "BarChart",
          }],
        },
        options: {
          plugins: {
            legend: {
                display: false,
            },
        },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })

  }

}
