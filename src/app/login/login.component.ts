import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AuthState } from '../shared/store';
import * as AuthActions from '../shared/store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  login = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store<AuthState>) {}

  onSubmit(e: Event) {
    e.preventDefault();
    this.store.dispatch(new AuthActions.Login(this.login.value));
  }
}
