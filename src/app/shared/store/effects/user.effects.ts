import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { UserActionTypes } from '../actions';
import * as UserActions from '../actions/user.actions';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { UserService } from '../../services';
import { UserPublicInfo } from '../../models/user.model';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}

  @Effect()
  getUserInfo$: Observable<Action> = this.actions$
    .ofType<UserActions.GetUserInfo>(UserActionTypes.GET_USER_INFO)
    .pipe(
      switchMap(() =>
        this.userService.getUserInfo()
          .pipe(
            map((res: any) => {
              const { email, firstName, lastName } = res;
              return new UserActions.GetUserInfoSuccess(new UserPublicInfo(email, firstName, lastName));
            }),
            catchError(err => of(new UserActions.GetUserInfoError(err))),
          ),
      ),
    );
}
