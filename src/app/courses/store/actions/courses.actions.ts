import { Action } from '@ngrx/store';

import { Course } from '../../course-list/course-list-item/course.model';
import { QueryAndStart } from '../state';

export class CoursesActionTypes {
  static readonly GET_COURSES = '[Courses] GET_COURSES';
  static readonly GET_COURSES_SUCCESS = '[Courses] GET_COURSES_SUCCESS';
  static readonly GET_COURSES_ERROR = '[Courses] GET_COURSES_ERROR';
  static readonly GET_COURSE = '[Courses] GET_COURSE';
  static readonly GET_COURSE_SUCCESS = '[Courses] GET_COURSE_SUCCESS';
  static readonly GET_COURSE_ERROR = '[Courses] GET_COURSE_ERROR';
  static readonly CREATE_COURSE = '[Courses] CREATE_COURSE';
  static readonly CREATE_COURSE_SUCCESS = '[Courses] CREATE_COURSE_SUCCESS';
  static readonly CREATE_COURSE_ERROR = '[Courses] CREATE_COURSE_ERROR';
  static readonly UPDATE_COURSE = '[Courses] UPDATE_COURSE';
  static readonly UPDATE_COURSE_SUCCESS = '[Courses] UPDATE_COURSE_SUCCESS';
  static readonly UPDATE_COURSE_ERROR = '[Courses] UPDATE_COURSE_ERROR';
  static readonly DELETE_COURSE = '[Courses] DELETE_COURSE';
  static readonly DELETE_COURSE_SUCCESS = '[Courses] DELETE_COURSE_SUCCESS';
  static readonly DELETE_COURSE_ERROR = '[Courses] DELETE_COURSE_ERROR';
  static readonly RESET_COURSE = '[Courses] RESET_COURSE';
  static readonly SET_QUERY_AND_START = '[Courses] SET_QUERY_AND_START';
}

export class GetCourses implements Action {
  readonly type = CoursesActionTypes.GET_COURSES;
}

export class GetCoursesSuccess implements Action {
  readonly type = CoursesActionTypes.GET_COURSES_SUCCESS;
  constructor(public payload: Course[]) {}
}

export class GetCoursesError implements Action {
  readonly type = CoursesActionTypes.GET_COURSES_ERROR;
  constructor(public payload: Error | string) {}
}

export class GetCourse implements Action {
  readonly type = CoursesActionTypes.GET_COURSE;
  constructor(public payload: number) {}
}

export class GetCourseSuccess implements Action {
  readonly type = CoursesActionTypes.GET_COURSE_SUCCESS;
  constructor(public payload: Course) {}
}

export class GetCourseError implements Action {
  readonly type = CoursesActionTypes.GET_COURSE_ERROR;
  constructor(public payload: Error | string) {}
}

export class CreateCourse implements Action {
  readonly type = CoursesActionTypes.CREATE_COURSE;
  constructor(public payload: Partial<Course>) {}
}

export class CreateCourseSuccess implements Action {
  readonly type = CoursesActionTypes.CREATE_COURSE_SUCCESS;
}

export class CreateCourseError implements Action {
  readonly type = CoursesActionTypes.CREATE_COURSE_ERROR;
  constructor(public payload: Error | string) {}
}

export class UpdateCourse implements Action {
  readonly type = CoursesActionTypes.UPDATE_COURSE;
  constructor(public payload: Partial<Course>) {}
}

export class UpdateCourseSuccess implements Action {
  readonly type = CoursesActionTypes.UPDATE_COURSE_SUCCESS;
}

export class UpdateCourseError implements Action {
  readonly type = CoursesActionTypes.UPDATE_COURSE_ERROR;
  constructor(public payload: Error | string) {}
}

export class DeleteCourse implements Action {
  readonly type = CoursesActionTypes.DELETE_COURSE;
  constructor(public payload: number) {}
}

export class DeleteCourseSuccess implements Action {
  readonly type = CoursesActionTypes.DELETE_COURSE_SUCCESS;
}

export class DeleteCourseError implements Action {
  readonly type = CoursesActionTypes.DELETE_COURSE_ERROR;
  constructor(public payload: Error | string) {}
}

export class ResetCourse implements Action {
  readonly type = CoursesActionTypes.RESET_COURSE;
}

export class SetQueryAndStart implements Action {
  readonly type = CoursesActionTypes.SET_QUERY_AND_START;
  constructor(public payload: QueryAndStart) {}
}

export type CoursesActions
  = GetCourses
  | GetCoursesSuccess
  | GetCoursesError
  | GetCourse
  | GetCourseSuccess
  | GetCourseError
  | CreateCourse
  | CreateCourseSuccess
  | CreateCourseError
  | UpdateCourse
  | UpdateCourseSuccess
  | UpdateCourseError
  | DeleteCourse
  | DeleteCourseSuccess
  | DeleteCourseError
  | ResetCourse
  | SetQueryAndStart;
