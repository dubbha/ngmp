import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { getConfig, ConfigState } from '../../core/store';

import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  private config: ConfigState;

  constructor(
    private store: Store<ConfigState>,
    private http: HttpClient,
  ) {
    this.store.select(getConfig).subscribe(config => this.config = config);
  }

  getUserInfo(): Observable<any> {
    return this.http.get(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.user}`);
  }
}
