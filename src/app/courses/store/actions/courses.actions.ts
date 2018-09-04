import { Action } from '@ngrx/store';

import { Course } from '../../course-list/course-list-item/course.model';

export class CoursesActionTypes {
  static readonly GET_COURSES = '[Courses] GET_COURSES';
  static readonly GET_COURSES_SUCCESS = '[Courses] GET_COURSES_SUCCESS';
  static readonly GET_COURSES_ERROR = '[Courses] GET_COURSES_ERROR';
}

export class GetCourses implements Action {
  readonly type = CoursesActionTypes.GET_COURSES;
  constructor() {}
}

export class GetCoursesSuccess implements Action {
  readonly type = CoursesActionTypes.GET_COURSES_SUCCESS;
  constructor(public payload: Course[]) {}
}

export class GetCoursesError implements Action {
  readonly type = CoursesActionTypes.GET_COURSES_ERROR;
  constructor(public payload: Error | string) {}
}

export type CoursesActions
  = GetCourses
  | GetCoursesSuccess
  | GetCoursesError;
