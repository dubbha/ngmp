import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { getAuthIsLoading, getUserIsLoading } from '../store/selectors';
import { getCoursesIsLoading } from '../../courses/store';

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
      this.store.select(getCoursesIsLoading),
    ).subscribe(([authIsLoading, userIsLoading, coursesIsLoading]) => {
      this.isLoading = authIsLoading || userIsLoading || coursesIsLoading;
    });
  }
}
