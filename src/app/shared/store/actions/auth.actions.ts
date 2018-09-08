import { Action } from '@ngrx/store';

export class AuthActionTypes {
  static readonly LOGIN = '[Auth] LOGIN';
  static readonly LOGIN_SUCCESS = '[Auth] LOGIN_SUCCESS';
  static readonly LOGIN_ERROR = '[Auth] LOGIN_ERROR';
  static readonly LOGOUT = '[Auth] LOGOUT';
  static readonly LOGOUT_SUCCESS = '[Auth] LOGOUT_SUCCESS';
  static readonly LOGOUT_ERROR = '[Auth] LOGOUT_ERROR';
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: { email: string, password: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor() {}
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LOGIN_ERROR;
  constructor(public payload: Error | string) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LOGOUT_SUCCESS;
}

export class LogoutError implements Action {
  readonly type = AuthActionTypes.LOGOUT_ERROR;
  constructor(public payload: Error | string) {}
}

export type AuthActions
  = Login
  | LoginSuccess
  | LoginError
  | Logout
  | LogoutSuccess
  | LogoutError;
