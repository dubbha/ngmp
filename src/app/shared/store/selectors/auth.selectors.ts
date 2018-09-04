import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './../state';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getIsAuthenticated = createSelector(getAuthState, (state: AuthState) => state.isAuthenticated);

export const getAuthIsLoading = createSelector(getAuthState, (state: AuthState) => state.isLoading);
