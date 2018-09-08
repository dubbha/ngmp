import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './../state';
import { Course } from '../../course-list/course-list-item/course.model';

export const getCoursesState = createFeatureSelector<CoursesState>('courses');

export const getCourses = createSelector(getCoursesState, (state: CoursesState) => state.courses);
export const getCourse = createSelector(getCoursesState, (state: CoursesState) => state.course);
export const getQueryAndStart = createSelector(getCoursesState, (state: CoursesState) => state.queryAndStart);

// courses module might not yet be loaded when this selector is susbcribed to by a shared loader service
export const getCoursesIsLoading = createSelector(getCoursesState, (state: CoursesState) => state ? state.isLoading : false);

// course data might not yet be retrieved from the server when this selector is subscribed to
export const getCourseTitle = createSelector(getCourse, (course: Course) => course ? course.title : '');
