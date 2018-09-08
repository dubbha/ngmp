import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AuthState, getIsAuthenticated } from '../store';

import { appRoutingPaths } from '../../app.routing.paths';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanLoad {
  isAuthenticated: boolean;

  constructor(
    private router: Router,
    private store: Store<AuthState>,
  ) {
    this.store.select(getIsAuthenticated)
      .subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  canLoad(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigateByUrl(appRoutingPaths.login);
    }
    return this.isAuthenticated;
  }

  canActivate(): Observable<boolean> {
    return this.store.select(getIsAuthenticated);
  }
}
