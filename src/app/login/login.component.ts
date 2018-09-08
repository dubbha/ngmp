import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { AuthState } from '../shared/store';
import * as AuthActions from '../shared/store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  public email: string;
  public password: string;

  constructor(private store: Store<AuthState>) {}

  onSubmit(e: Event) {
    e.preventDefault();
    this.store.dispatch(new AuthActions.Login({
      email: this.email,
      password: this.password
    }));
  }
}
