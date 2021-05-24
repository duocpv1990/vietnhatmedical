import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, interval, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Directive({
  selector: '[NgMatTableQueryReflector]'
})
export class NgMatTableQueryReflectorDirective implements OnInit, OnDestroy {

  private unsubscribeAll$: Subject<any> = new Subject();
  @Input() dataSource: MatTableDataSource<any>;
  private _dataSourceChecker$: Subscription;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    await this.waitForDatasourceToLoad();
    this._initialSetup();
    this.listenToStateChangeEvents();
  }

  private _initialSetup(): void {

    const activePageQuery = this.isPageQueryActive();

    if (activePageQuery) {
      this.dataSource.paginator.pageIndex = activePageQuery.page_index;
      this.dataSource.paginator.pageSize = activePageQuery.page_size;
    }
  }



  private isPageQueryActive(): { page_size: number, page_index: number } {

    const queryParams = this._activatedRoute.snapshot.queryParams;

    if (queryParams.hasOwnProperty('page_size') || queryParams.hasOwnProperty('page_index')) {
      return {
        page_size: queryParams.page_size,
        page_index: queryParams.page_index
      };
    }

    return;
  }

  private listenToStateChangeEvents(): void {
    this.dataSource.paginator.page
      .pipe(
        takeUntil(this.unsubscribeAll$)
      )
      .subscribe((pageChange: PageEvent) => {
        this._applyPageStateChangesToUrlQueryParams(pageChange);
      });
  }

  private _applyPageStateChangesToUrlQueryParams(pageChange: PageEvent): void {

    const sortingAndPaginationQueryParams = {
      page_size: pageChange.pageSize,
      page_index: pageChange.pageIndex,
    };

    this._router.navigate([], { queryParams: sortingAndPaginationQueryParams, queryParamsHandling: 'merge' });
  }

  private waitForDatasourceToLoad(): Promise<void> {

    const titleCheckingInterval$ = interval(500);

    return new Promise((resolve) => {
      this._dataSourceChecker$ = titleCheckingInterval$.subscribe(val => {
        if (this.dataSource?.paginator) {
          this._dataSourceChecker$.unsubscribe();
          return resolve();
        }
      });
    });

  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

}
