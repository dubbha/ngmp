import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './../state';

export const getCoursesState = createFeatureSelector<CoursesState>('auth');

export const getCoursesIsLoading = createSelector(getCoursesState, (state: CoursesState) => state.isLoading);
