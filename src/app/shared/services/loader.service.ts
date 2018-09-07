import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { getAuthIsLoading, getUserIsLoading } from '../store/selectors';

import { combineLatest } from 'rxjs';

@Injectable()
export class LoaderService {
  isLoading = false;

  constructor(
    private store: Store<any>,
  ) {
    combineLatest(
      this.store.select(getAuthIsLoading),
      this.store.select(getUserIsLoading),
    ).subscribe(([authIsLoading, userIsLoading]) => {
      this.isLoading = authIsLoading || userIsLoading;
    });
  }
}
