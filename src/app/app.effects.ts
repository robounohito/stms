import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, switchMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';
import { AppService } from './app.service';
import { postsLoad, loadSuccess, employeesLoad, load } from './app.actions';
import { Store, select } from '@ngrx/store';
import { State, Provider } from './app.reducer';

@Injectable()
export class AppEffects {

  load$ = createEffect(() => this.actions$.pipe(
    ofType(load),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(
        select(state => state.app.currentProvider)
      ))
    )),
    switchMap(([_, provider]) => {
      if (provider === Provider.posts) {
        return this.loadPosts();
      } else {
        return this.loadEmployees();
      }
    })
  ));

  loadPosts$ = createEffect(() => this.actions$.pipe(
    ofType(postsLoad),
    switchMap(() => this.loadPosts())
  ));

  loadEmployees$ = createEffect(() => this.actions$.pipe(
    ofType(employeesLoad),
    switchMap(() => this.loadEmployees())
  ));

  constructor(
    private actions$: Actions,
    private store: Store<{ app: State }>,
    private appService: AppService,
  ) { }

  private loadPosts() {
    return this.appService.getPosts().pipe(
      map(posts => loadSuccess({
        provider: Provider.posts,
        entities: posts,
        headers: ['Title', 'Body'],
        fields: ['title', 'body']
      })),
      catchError(() => EMPTY)
    );
  }

  private loadEmployees() {
    return this.appService.getEmployees().pipe(
      map(wiki => loadSuccess({
        provider: Provider.employees,
        entities: wiki.data,
        headers: ['Employee Name', 'Salary'],
        fields: ['employee_name', 'employee_salary']
      })),
      catchError(() => EMPTY)
    );
  }

}
