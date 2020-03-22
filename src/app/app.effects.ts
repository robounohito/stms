import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AppService } from './app.service';
import { postsLoad, loadSuccess, employeesLoad } from './app.actions';

@Injectable()
export class AppEffects {

  loadPosts$ = createEffect(() => this.actions$.pipe(
    ofType(postsLoad),
    switchMap(() => this.appService.getPosts().pipe(
      map(posts => loadSuccess({
        entities: posts,
        headers: ['Title', 'Body'],
        fields: ['title', 'body']
      })),
      catchError(() => EMPTY)
    ))
  ));

  loadEmployees$ = createEffect(() => this.actions$.pipe(
    ofType(employeesLoad),
    switchMap(() => this.appService.getEmployees().pipe(
      map(wiki => loadSuccess({
        entities: wiki.data,
        headers: ['Employee Name', 'Salary'],
        fields: ['employee_name', 'employee_salary']
      })),
      catchError(() => EMPTY)
    ))
  ));

  constructor(
    private actions$: Actions,
    private appService: AppService,
  ) { }

}
