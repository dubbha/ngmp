import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { getConfig, ConfigState } from '../../core/store';

import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private config: ConfigState;

  constructor(
    private store: Store<ConfigState>,
    private http: HttpClient,
  ) {
    this.store.select(getConfig).subscribe(config => this.config = config);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.login}`, { email, password });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.logout}`);
  }
}
