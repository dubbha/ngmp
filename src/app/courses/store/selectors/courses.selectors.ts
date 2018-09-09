import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './../state';
import { Course, Author } from '../../models';

export const getCoursesState = createFeatureSelector<CoursesState>('courses');

export const getCourses = createSelector(getCoursesState, (state: CoursesState) => state.courses);
export const getCourse = createSelector(getCoursesState, (state: CoursesState) => state.course);
export const getQueryAndStart = createSelector(getCoursesState, (state: CoursesState) => state.queryAndStart);
export const getAuthors = createSelector(getCoursesState, (state: CoursesState) => state.authors);

// courses module might not yet be loaded when this selector is susbcribed to by a shared loader service
export const getCoursesIsLoading = createSelector(getCoursesState, (state: CoursesState) => state ? state.isLoading : false);

// course data might not yet be retrieved from the server when this selector is subscribed to
export const getCourseTitle = createSelector(getCourse, (course: Course) => course ? course.title : '');

export const getCourseAuthors = createSelector(getCourse, getAuthors,
  (course: Course, authors: Author[]) => {
    course.authorIds.map(id => authors.find(a => a.id === id));
  });
