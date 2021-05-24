import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { SalesComponent } from './sales/sales.component';

@Component({
  selector: 'app-customer-storage',
  templateUrl: './customer-storage.component.html',
  styleUrls: ['./customer-storage.component.scss']
})
export class CustomerStorageComponent implements OnInit {
  @Input() selectedIndex: number | null
  @ViewChild(SalesComponent) private salesComponent: SalesComponent;
  @ViewChild('marketing', { read: ViewContainerRef }) marketing: ViewContainerRef;
  @ViewChild('l8', { read: ViewContainerRef }) l8: ViewContainerRef;

  customer: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cfr: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => this.checkActiveTab());
  }

  onTabChanged(event: MatTabChangeEvent) {
    if (event.index == 0) {
      this.salesComponent.getCustomerInSalesStorage();
    }
  }

  checkActiveTab() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.selectedIndex = +params.get('tab');
      this.selectedIndex === 1 && this.loadMarketingStorage();
      this.selectedIndex === 2 && this.loadL8Storage();

    });
  }

  async loadMarketingStorage() {
    this.marketing.clear();
    const { MarketingComponent } = await import('./marketing/marketing.component');
    this.marketing.createComponent(
      this.cfr.resolveComponentFactory(MarketingComponent)
    );
  }

  async loadL8Storage() {
    this.l8.clear();
    const { L8Component } = await import('./l8/l8.component');
    this.l8.createComponent(
      this.cfr.resolveComponentFactory(L8Component)
    );
  }

}
