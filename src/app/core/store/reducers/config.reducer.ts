import { ConfigState, initialConfigState } from './../state/config.state';

export function configReducer(
  state = initialConfigState,
): ConfigState {
  return state;
}
