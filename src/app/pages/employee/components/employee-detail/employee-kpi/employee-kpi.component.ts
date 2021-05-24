import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-employee-kpi",
  templateUrl: "./employee-kpi.component.html",
  styleUrls: ["./employee-kpi.component.scss"],
})
export class EmployeeKpiComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor() {}

  displayedColumns = [
    "Tháng",
    "Năm",
    "Tỉ lệ gọi",
    "Tỉ lệ gặp",
    "Tỉ lệ chốt",
    "Doanh số",
  ];
  dataSource: any;
  testList = [
    {
      a: 1,
      b: 2019,
      c: 60,
      d: 30,
      e: 85,
      f: 2000000,
    },
    {
      a: 2,
      b: 2019,
      c: 80,
      d: 50,
      e: 20,
      f: 2000000,
    },
    {
      a: 3,
      b: 2019,
      c: 40,
      d: 70,
      e: 90,
      f: 2000000,
    },
    {
      a: 4,
      b: 2019,
      c: 70,
      d: 70,
      e: 80,
      f: 2000000,
    },
  ];
  width: number;
  color: string;
  ngOnInit(): void {
    // this.width = 70;
    // if(this.width < 30) {
    //   this.color = 'red'
    // }
    // else if(this.width > 60) {
    //   this.color = 'blue'
    // }
    // else {
    //   this.color = 'yellow'
    // }
    this.dataSource = new MatTableDataSource(this.testList);
  }
}
