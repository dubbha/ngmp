import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { getCourseTitle, CoursesState } from '../store';

import { Subscription } from 'rxjs';

import { appRoutingPaths } from '../../app.routing.paths';
import { coursesRoutingPaths } from '../courses.routing.paths';
import { AutoUnsubscribe } from '../../core/decorators';

type breadCrumbsType = { text: string, path?: string }[];

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.sass']
})
@AutoUnsubscribe()
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadCrumbs: breadCrumbsType;

  private sub: Subscription;

  constructor(
    private router: Router,
    private store: Store<CoursesState>,
  ) {}

  ngOnInit() {
    this.initBreadCrumbs(this.router.url);
  }

  ngOnDestroy() {}  // must implement OnDestroy for AutoUnsubscribe decorator to work with AOT

  initBreadCrumbs(url: string) {
    // router.url might not have a leading slash
    const urlArr = url[0] === '/' ? url.split('/').slice(1) : url.split('/');

    switch (urlArr[0]) {
      case 'courses':
        this.initCoursesBreadCrumbs(urlArr);
        break;
      default:
        this.breadCrumbs = [{ text: 'Bread' }, { text: 'Crumbs' }];
    }
  }

  initCoursesBreadCrumbs(urlArr: string[]): void {
    if (urlArr.length === 1) {
      this.breadCrumbs = [{ text: 'Courses' }];
    } else {
      const crumbs = [{ text: 'Courses', path: appRoutingPaths.courses }];

      if (urlArr[1] === coursesRoutingPaths.new) {
        this.breadCrumbs = [...crumbs, { text: 'New' }];
      } else if (urlArr[1].match(/^[0-9]*$/)) {
        this.sub = new Subscription();
        this.sub.add(this.store.select(getCourseTitle)
          .subscribe(title => this.breadCrumbs = [...crumbs, { text: title }]));
      } else {
        this.breadCrumbs = crumbs;
      }
    }
  }

  go(path: string) {
    this.router.navigateByUrl(path);
  }
}
