import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './../state';
import { Course } from '../../course-list/course-list-item/course.model';

export const getCoursesState = createFeatureSelector<CoursesState>('courses');

export const getCourses = createSelector(getCoursesState, (state: CoursesState) => state.courses);
export const getCourse = createSelector(getCoursesState, (state: CoursesState) => state.course);
export const getQueryAndStart = createSelector(getCoursesState, (state: CoursesState) => state.queryAndStart);
export const getCoursesIsLoading = createSelector(getCoursesState, (state: CoursesState) => state.isLoading);

export const getCourseTitle = createSelector(getCourse, (course: Course) => course ? course.title : '');
