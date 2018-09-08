import { ActionReducerMap } from '@ngrx/store';

import { ConfigState } from '../state/config.state';
import { configReducer } from './config.reducer';

export interface State {
  config: ConfigState;
}

export const rootReducers: ActionReducerMap<State> = {
  config: configReducer,
};

