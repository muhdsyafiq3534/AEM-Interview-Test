import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardClient } from '../clients/dashboard.client';
import { AuthService } from '../services/auth.service';
import { Chart } from 'chart.js';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';

export interface chartData {
  name: string
  value: number
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
  tableData: any
  users: table[] = []
  dataSource: any
  displayedColumns: string[] = ["no", "First Name", "Last Name", "User Name"];
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
      this.tableData = res
      this.tableData.tableUsers.forEach((x: table) => {
        let data = { firstName: x.firstName, lastName: x.lastName, username: x.username }
        this.users.push(data)
      });
      this.dataSource = this.users
    })
  }

  getdoughnutChart() {
    this.dashboard.subscribe(res => {
      this.getDonut = res
      this.getDonut.chartDonut.forEach((x: chartData) => {
        let data = x.name
        this.getDonutName.push(data)
        this.getDonutValue.push(x.value)
      });
      var myChart = new Chart("myChart1", {
        type: 'doughnut',
        data: {
          labels: this.getDonutName,
          datasets: [{
            data: this.getDonutValue,
            backgroundColor: ["#CACFD2", "#626567","#909497","#A6ACAF"],
          }],
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
  }

  getBarchart() {
    this.dashboard.subscribe(res => {
      this.getBar = res
      this.getBar.chartBar.forEach((x: chartData) => {
        this.getBarName.push(x.name)
        this.getBarValue.push(x.value)
      });
      var myChart = new Chart("myChart", {
        type: 'bar',
        data: {
          labels: this.getBarName,
          datasets: [{
            data: this.getBarValue,
            label: "BarChart",
            backgroundColor: ["#909497"],
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
