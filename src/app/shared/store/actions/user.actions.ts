import { Action } from '@ngrx/store';

import { UserPublicInfo } from '../../models/user.model';

export class UserActionTypes {
  static readonly GET_USER_INFO = '[User] GET_USER_INFO';
  static readonly GET_USER_INFO_SUCCESS = '[User] GET_USER_INFO_SUCCESS';
  static readonly GET_USER_INFO_ERROR = '[User] GET_USER_INFO_ERROR';
}

export class GetUserInfo implements Action {
  readonly type = UserActionTypes.GET_USER_INFO;
  constructor() {}
}

export class GetUserInfoSuccess implements Action {
  readonly type = UserActionTypes.GET_USER_INFO_SUCCESS;
  constructor(public payload: UserPublicInfo) {}
}

export class GetUserInfoError implements Action {
  readonly type = UserActionTypes.GET_USER_INFO_ERROR;
  constructor(public payload: Error | string) {}
}

export type UserActions
  = GetUserInfo
  | GetUserInfoSuccess
  | GetUserInfoError;
