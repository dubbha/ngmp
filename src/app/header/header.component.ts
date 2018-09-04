import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';

import { Store } from '@ngrx/store';
import { getIsAuthenticated, getUserInfo, AuthState } from '../shared/store';
import * as AuthActions from '../shared/store/actions';
import * as UserActions from '../shared/store/actions';

import { AuthService } from '../shared/services';
import { UserPublicInfo } from '../shared/models';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  user: UserPublicInfo;

  private sub: Subscription;

  constructor(
    private store: Store<AuthState>,
    public authService: AuthService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.sub = new Subscription();
    this.sub.add(this.store.select(getIsAuthenticated).subscribe(next => this.isAuthenticated = next));
    this.sub.add(this.store.select(getUserInfo).subscribe(next => this.user = next));

    this.sub.add(this.router.events.subscribe((event: RouterEvent) => this.getUserInfo(event)));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  getUserInfo(routerEvent: RouterEvent) {
    if (this.isAuthenticated && !this.user && routerEvent instanceof NavigationEnd) {
      this.store.dispatch(new UserActions.GetUserInfo());
    }
  }

}
