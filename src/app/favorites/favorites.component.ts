import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Store, select } from '@ngrx/store';
import { State, Favorite } from '../app.reducer';
import { tap } from 'rxjs/operators';
import { saveComment } from '../app.actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {

  favorites$: Observable<Favorite[]>;
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['columnOne', 'columnTwo', 'comment'];
  @ViewChild(MatSort, { static: false }) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(
    private store: Store<{ app: State }>,
  ) { }

  ngOnInit() {
    this.favorites$ = this.store.pipe(
      select(state => state.app.favorites),
      tap(favs => this.dataSource.data = favs)
    );
  }

  handleCommentSave(fav: Favorite, text: string) {
    this.store.dispatch(saveComment({
      favorite: {
        ...fav,
        comment: text,
      }
    }));

  }

}
