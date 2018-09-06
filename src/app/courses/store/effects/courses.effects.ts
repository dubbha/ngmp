import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { CoursesActionTypes } from '../actions';
import * as CoursesActions from '../actions/courses.actions';

import { Observable, of } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { CoursesService } from '../../courses.service';
import { appRoutingPaths  } from '../../../app.routing.paths';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private router: Router,
  ) {}

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType<CoursesActions.GetCourses>(CoursesActionTypes.GET_COURSES)
    .pipe(
      switchMap(() =>
        this.coursesService.getCourses()
          .pipe(
            map((res: any) => {
              if (res.auth && res.token) {
                return new CoursesActions.GetCoursesSuccess();
              }
            }),
            catchError(err => of(new CoursesActions.GetCoursesError(err))),
          ),
      ),
    );

  @Effect({ dispatch: false })
  loginSuccess$: Observable<Action> = this.actions$
    .ofType<CoursesActions.GetCoursesSuccess>(CoursesActionTypes.GET_COURSES_SUCCESS)
    .pipe(
      tap(() => {
        this.router.navigateByUrl(appRoutingPaths.courses);
      })
    );
}
