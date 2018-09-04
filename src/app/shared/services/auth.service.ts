import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { getConfig, ConfigState } from '../../core/store';

import { BehaviorSubject, Observable, throwError, Subscription } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { UserPublicInfo } from '../models/user.model';

import { LocalStorageService } from '../../core/services';

@Injectable()
export class AuthService {
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userInfo: BehaviorSubject<UserPublicInfo> = new BehaviorSubject(null);

  private sub: Subscription;
  private config: ConfigState;

  constructor(
    private store: Store<ConfigState>,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
  ) {
    this.sub = this.store.select(getConfig).subscribe(config => this.config = config);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.login}`, { email, password });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.logout}`);

    // return this.http.get(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.logout}`)
    //   .pipe(
    //     tap((res: any) => {
    //       if (res.success) {
    //         this.localStorageService.removeItem('token');
    //         this.isAuthenticated.next(false);
    //       }
    //     }),
    //     retry(1),
    //     catchError(err => throwError(err)),
    //   );
  }

  getUserInfo(): Observable<UserPublicInfo> {
    return this.http.get(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.user}`)
      .pipe(
        tap((res: any) => {
          const { email, firstName, lastName } = res;
          this.userInfo.next(new UserPublicInfo(email, firstName, lastName)  );
        }),
        retry(1),
        catchError(err => throwError(err)),
      );
  }
}
