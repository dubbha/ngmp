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
  getCourses$: Observable<Action> = this.actions$
    .ofType<CoursesActions.GetCourses>(CoursesActionTypes.GET_COURSES)
    .pipe(
      switchMap(() =>
        this.coursesService.getCourses()
          .pipe(
            map((res: any) => {
              return new CoursesActions.GetCoursesSuccess(res);
            }),
            catchError(err => of(new CoursesActions.GetCoursesError(err))),
          ),
      ),
    );

  @Effect()
  getCourse$: Observable<Action> = this.actions$
    .ofType<CoursesActions.GetCourse>(CoursesActionTypes.GET_COURSE)
    .pipe(
      switchMap(({ payload: id }) =>
        this.coursesService.getCourse(id)
          .pipe(
            map((res: any) => {
              return new CoursesActions.GetCourseSuccess(res);
            }),
            catchError(err => of(new CoursesActions.GetCourseError(err))),
          ),
      ),
    );
}
