import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './../state';

export const getCoursesState = createFeatureSelector<CoursesState>('courses');

export const getCourses = createSelector(getCoursesState, (state: CoursesState) => state.courses);
export const getCourse = createSelector(getCoursesState, (state: CoursesState) => state.course);
export const getQueryAndStart = createSelector(getCoursesState, (state: CoursesState) => state.queryAndStart);
export const getCoursesIsLoading = createSelector(getCoursesState, (state: CoursesState) => state.isLoading);
