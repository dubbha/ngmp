import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './shared/services';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

import { Store } from '@ngrx/store';
import { AuthState, getIsAuthenticated } from './shared/store';

import { Subscription } from 'rxjs';

import { appRoutingPaths } from './app.routing.paths';

registerLocaleData(localeUk);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  routeSpecificClass: string;

  private sub: Subscription;

  constructor(
    private store: Store<AuthState>,
    public authService: AuthService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.sub = new Subscription();
    this.sub.add(this.store.select(getIsAuthenticated).subscribe(next => this.isAuthenticated = next));
    this.sub.add(this.router.events.subscribe((event: RouterEvent) => this.setRouteSpecificClasses(event)));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setRouteSpecificClasses(routerEvent: RouterEvent) {
    if (routerEvent instanceof NavigationEnd) {
      const routeClassMap = {
        [appRoutingPaths.login]: 'app__main_center',
        [appRoutingPaths.notFound]: 'app__main_center',
      };

      this.routeSpecificClass = routeClassMap[routerEvent.urlAfterRedirects.slice(1)];
    }
  }
}
