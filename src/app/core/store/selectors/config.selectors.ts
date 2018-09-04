import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigState } from './../state';

export const getConfigState = createFeatureSelector<ConfigState>('config');

export const getConfig = createSelector(getConfigState, (state: ConfigState) => state);
