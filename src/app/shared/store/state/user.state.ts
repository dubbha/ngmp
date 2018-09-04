import { UserPublicInfo } from '../../models/user.model';

export interface UserState {
  readonly userInfo: UserPublicInfo;
  readonly isLoading: boolean;
}

export const initialUserState: UserState = {
  userInfo: null,
  isLoading: false,
};
