import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LoaderService } from '../shared/services';
import { appRoutingPaths } from '../app.routing.paths';

import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnDestroy {
  public email: string;
  public password: string;

  public sub: Subscription;

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    private router: Router,
  ) {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.loaderService.start();
    this.sub = this.authService.login(this.email, this.password)
      .pipe(finalize(() => this.loaderService.stop()))  // stop the loader on both success or failure
      .subscribe(res => {
        if (res.auth) {
          this.router.navigateByUrl(appRoutingPaths.courses);
        }
      });
  }
}
