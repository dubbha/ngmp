import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { getConfig, ConfigState } from '../../core/store';
import { CoursesState } from '../store/state';
import { getCourses, getQueryAndStart } from '../store/selectors';
import { GetCourses, SetQueryAndStart, DeleteCourse, ResetCourses } from '../store/actions';

import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, withLatestFrom, tap } from 'rxjs/operators';

import { Course } from '../models';
import { CoursesService } from '../courses.service';
import { OrderByPipe } from './order-by.pipe';
import { DialogService } from '../../material/dialog/dialog.service';
import { appRoutingPaths } from '../../app.routing.paths';
import { LoaderService } from '../../shared/services';
import { AutoUnsubscribe } from '../../core/decorators';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.sass']
})
@AutoUnsubscribe()
export class CourseListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() query: string;

  query$ = new BehaviorSubject<string>('');
  start$ = new BehaviorSubject<number>(0);

  courses: Course[] = [];
  append = false;
  done = false;

  private config: ConfigState;
  private sub: Subscription;

  constructor(
    public coursesService: CoursesService,
    public loaderService: LoaderService,
    private configStore: Store<CoursesState>,
    private coursesStore: Store<CoursesState>,
    private dialogService: DialogService,
    private orderByPipe: OrderByPipe,
    private router: Router,
  ) {}

  ngOnInit() {
    this.query$.pipe(
      // query should either be empty (full search) or consist of at least 3 non-space chars
      filter(query => query === '' || (query.length >= 3 && !(/^[\s]+$/g).test(query))),
      debounceTime(250),
      distinctUntilChanged()
    ).subscribe(query => this.coursesStore.dispatch(new SetQueryAndStart({
      query,
      start: 0,
    })));

    this.start$.pipe(
      filter(s => s >= 0),  // start shouldn't be negative
      withLatestFrom(this.query$),
    ).subscribe(([start, query]) => this.coursesStore.dispatch(new SetQueryAndStart({
      query,
      start,
    })));

    this.sub = new Subscription();

    this.sub.add(this.configStore.select(getConfig)
      .subscribe(config => this.config = config));

    this.sub.add(this.coursesStore.select(getCourses)
      .subscribe(courses => {
        this.done = courses.length < this.config.coursesPageLength;

        this.courses = this.orderByPipe.transform(
          this.append ? [...this.courses, ...courses] : courses,
        );

        this.append = false;
      }));

    this.sub.add(this.coursesStore.select(getQueryAndStart)
      .pipe(distinctUntilChanged((a, b) => a.query === b.query && a.start === b.start))
      .subscribe(() => this.coursesStore.dispatch(new GetCourses())));
  }

  ngOnChanges(changes: SimpleChanges) {
    const { currentValue, previousValue, firstChange } = changes.query;

    if (!firstChange && currentValue !== previousValue) {
      this.query$.next(currentValue);
    }
  }

  ngOnDestroy() {
    this.coursesStore.dispatch(new ResetCourses());
  }

  onEdit(id: number) {
    this.router.navigateByUrl(`${appRoutingPaths.courses}/${id}`);
  }

  onDelete(id: number) {
    this.dialogService
      .confirm('Do you really want to delete this course?')
      .subscribe(confirmed => {
        if (confirmed) {
          this.coursesStore.dispatch(new DeleteCourse(id));
        }
      });
  }

  onLoadClick() {
    this.append = true;
    this.start$.next(this.courses.length);
  }
}
