import { Component, OnInit } from '@angular/core';
import { BarData } from 'src/app/model/data';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chartDataArray: BarData[] = [];

  constructor(private httpServ : HttpService) { }

  ngOnInit() {
    this.fetchDat();
  }

  private fetchDat(){
    this.httpServ.getData().subscribe({
      next:(data:BarData[]) => {
      this.chartDataArray = data;
    },
    error: (error) => {

    },
    complete: () => {

    }
    });
  }
}
