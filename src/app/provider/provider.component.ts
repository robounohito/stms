import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, Entity, Provider } from '../app.reducer';
import { Observable } from 'rxjs';
import { postsLoad, entityCheck, employeesLoad, load } from '../app.actions';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tap, filter } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderComponent implements OnInit {

  state$: Observable<State>;
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['checked', 'columnOne', 'columnTwo'];
  provider = Provider;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort, { static: false }) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(
    private store: Store<{ app: State }>
  ) { }

  ngOnInit() {
    this.state$ = this.store.pipe(
      select(state => state.app),
      tap(state => this.dataSource.data = state.entities)
    );
    this.store.dispatch(load());
  }

  handleCheckboxChange(post: Entity) {
    this.store.dispatch(entityCheck({ entity: { ...post, checked: !post.checked } }));
  }

  handleProviderSelect(event) {
    if (event.value === Provider.employees) {
      this.store.dispatch(employeesLoad());
    } else {
      this.store.dispatch(postsLoad());
    }
  }

  trackByFn(index, item) {
    return item.id || index;
  }

}
