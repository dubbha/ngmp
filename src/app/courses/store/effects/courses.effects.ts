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
            map((res: any) => new CoursesActions.GetCoursesSuccess(res)),
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
            map((res: any) => new CoursesActions.GetCourseSuccess(res)),
            catchError(err => of(new CoursesActions.GetCourseError(err))),
          ),
      ),
    );

  @Effect()
  createCourse$: Observable<Action> = this.actions$
    .ofType<CoursesActions.CreateCourse>(CoursesActionTypes.CREATE_COURSE)
    .pipe(
      switchMap(({ payload }) =>
        this.coursesService.createCourse(payload)
          .pipe(
            map(() => new CoursesActions.CreateCourseSuccess()),
            catchError(err => of(new CoursesActions.CreateCourseError(err))),
          ),
      ),
    );

  @Effect({ dispatch: false })
  createCourseSuccess$: Observable<Action> = this.actions$
    .ofType<CoursesActions.CreateCourseSuccess>(CoursesActionTypes.CREATE_COURSE_SUCCESS)
    .pipe(
      tap(() => {
        this.router.navigateByUrl(appRoutingPaths.courses);
      })
    );

  @Effect()
  updateCourse$: Observable<Action> = this.actions$
    .ofType<CoursesActions.UpdateCourse>(CoursesActionTypes.UPDATE_COURSE)
    .pipe(
      switchMap(({ payload }) =>
        this.coursesService.updateCourse(payload)
          .pipe(
            map(() => new CoursesActions.UpdateCourseSuccess()),
            catchError(err => of(new CoursesActions.UpdateCourseError(err))),
          ),
      ),
    );

  @Effect({ dispatch: false })
  updateCourseSuccess$: Observable<Action> = this.actions$
    .ofType<CoursesActions.UpdateCourseSuccess>(CoursesActionTypes.UPDATE_COURSE_SUCCESS)
    .pipe(
      tap(() => {
        this.router.navigateByUrl(appRoutingPaths.courses);
      })
    );

  @Effect()
  deleteCourse$: Observable<Action> = this.actions$
    .ofType<CoursesActions.DeleteCourse>(CoursesActionTypes.DELETE_COURSE)
    .pipe(
      switchMap(({ payload }) =>
        this.coursesService.deleteCourse(payload)
          .pipe(
            map(() => new CoursesActions.DeleteCourseSuccess()),
            catchError(err => of(new CoursesActions.DeleteCourseError(err))),
          ),
      ),
    );
}
