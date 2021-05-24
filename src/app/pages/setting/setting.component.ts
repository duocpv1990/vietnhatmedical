import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  selected : Number = 1;
  constructor() { }


  ngOnInit(): void {
  }


  showSelected( id:number ) {
      this.selected = id;
  }

}
