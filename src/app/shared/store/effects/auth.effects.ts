import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { AuthActionTypes } from '../actions';
import * as AuthActions from '../actions/auth.actions';

import { Observable, of } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { AuthService } from '../../services';
import { LocalStorageService } from '../../../core/services';
import { appRoutingPaths  } from '../../../app.routing.paths';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType<AuthActions.Login>(AuthActionTypes.LOGIN)
    .pipe(
      switchMap(({ payload }) =>
        this.authService.login(payload.email, payload.password)
          .pipe(
            map((res: any) => {
              if (res.auth && res.token) {
                this.localStorageService.setItem('token', res.token);
                return new AuthActions.LoginSuccess();
              }
            }),
            catchError(() => of(new AuthActions.LoginError())),
          ),
      ),
    );

  @Effect({ dispatch: false })
  loginSuccess$: Observable<Action> = this.actions$
    .ofType<AuthActions.Login>(AuthActionTypes.LOGIN_SUCCESS)
    .pipe(
      tap(() => {
        this.router.navigateByUrl(appRoutingPaths.courses);
      })
    );

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType<AuthActions.Login>(AuthActionTypes.LOGOUT)
    .pipe(
      switchMap(() =>
        this.authService.logout()
          .pipe(
            map((res: any) => {
              if (res.success) {
                this.localStorageService.removeItem('token');
                return new AuthActions.LogoutSuccess();
              }
            }),
            catchError(() => of(new AuthActions.LoginError())),
          ),
      ),
    );

  @Effect({ dispatch: false })
  logoutSuccess$: Observable<Action> = this.actions$
    .ofType<AuthActions.Login>(AuthActionTypes.LOGOUT_SUCCESS)
    .pipe(
      tap(() => {
        this.router.navigateByUrl(appRoutingPaths.login);
      })
    );
}
