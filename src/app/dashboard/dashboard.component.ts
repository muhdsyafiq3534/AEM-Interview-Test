import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardClient } from '../clients/dashboard.client';
import { AuthService } from '../services/auth.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';

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
  test1: any
  donutName: any[] = []
  donutValue: any[] = []
  barName: barDetail[] = []
  users: table[] = []
  dataSource: any
  displayedColumns: string[] = ["First Name", "Last Name", "User Name"];

  constructor(
    private AuthService: AuthService,
    private DashboardClient: DashboardClient
  ) { }

  ngOnInit(): void {
    this.getData()
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
      console.log(this.dataSource, "datasorce");
    })
  }

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.donutName,
    datasets: [
      {
        data: this.donutValue,
        //backgroundColor: ["red", "green", "blue"],
      },
    ]
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ["Barchart"],
    datasets: this.barName
  };
}
