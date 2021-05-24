import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BaseComponent } from "../../shared/components/base.component";
import { ShowRemiderService } from 'src/app/shared/services/show-remider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  constructor(
    private showRemider: ShowRemiderService,
    public router: Router
  ) { super(router); this.checkToken(); }

  ngOnInit(): void {
    let reload = localStorage.getItem('reload');
    if (reload) {
      window.location.reload();
      localStorage.removeItem('reload');
    }
    this.showRemider.showRemider();
  }

}
