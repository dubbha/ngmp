import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { AuthService } from '../services';
import { appRoutingPaths } from '../../app.routing.paths';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanLoad {
  isAuthenticated: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.isAuthenticated.subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
    });
  }

  canLoad(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigateByUrl(appRoutingPaths.login);
    }
    return this.isAuthenticated;
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated;
  }
}
