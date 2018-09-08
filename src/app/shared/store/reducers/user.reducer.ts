
import { UserActionTypes, UserActions } from '../actions';
import { UserState, initialUserState } from '../state';
import { UserPublicInfo } from '../../models/user.model';

export function userReducer(
  state = initialUserState,
  action: UserActions,
): UserState {
  switch (action.type) {
    case UserActionTypes.GET_USER_INFO:
      return {
        ...state,
        isLoading: true,
      };

    case UserActionTypes.GET_USER_INFO_SUCCESS:
      const userInfo: UserPublicInfo = action.payload;

      return {
        ...state,
        isLoading: false,
        userInfo,
      };

    case UserActionTypes.GET_USER_INFO_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default: {
      return state;
    }
  }
}
