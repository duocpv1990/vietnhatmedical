import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent implements OnInit {

  constructor() { }

  percent = 77;
  bgcolor = '';
  class : string;

  ngOnInit(): void {

    if (this.percent < 25) {
      this.class = 'red';
    }
    else if (50 < this.percent && this.percent < 75) {
      this.bgcolor = 'blue';
    }
    else {
      this.bgcolor = 'green';
    }

  }

}
