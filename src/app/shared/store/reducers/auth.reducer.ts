import { AuthActionTypes, AuthActions } from '../actions';
import { AuthState, initialAuthState } from './../state/auth.state';

export function authReducer(
  state = initialAuthState,
  action: AuthActions,
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        isLoading: true,
      };

    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };

    case AuthActionTypes.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isLoading: true,
      };

    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };

    case AuthActionTypes.LOGOUT_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default: {
      return state;
    }
  }
}
