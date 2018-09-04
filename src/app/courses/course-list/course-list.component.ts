import { Component, Input, OnInit, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, withLatestFrom } from 'rxjs/operators';

import { Course } from './course-list-item/course.model';
import { CoursesService, IQueryAndStart } from '../courses.service';
import { OrderByPipe } from './order-by.pipe';
import { DialogService } from '../../material/dialog/dialog.service';
import { appRoutingPaths } from '../../app.routing.paths';
import { ConfigService } from '../../core/services';
import { LoaderService } from '../../shared/services';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.sass']
})
export class CourseListComponent implements OnChanges, OnInit {
  @Input() query: string;

  query$ = new BehaviorSubject<string>('');
  start$ = new BehaviorSubject<number>(0);
  queryAndStart$ = new BehaviorSubject<IQueryAndStart>({
    query: this.query$.value,
    start: this.start$.value
  });

  courses: Course[] = [];
  append = false;
  done = false;

  constructor(
    @Inject(ConfigService) private config,
    private coursesService: CoursesService,
    private dialogService: DialogService,
    private orderByPipe: OrderByPipe,
    private router: Router,
    public loaderService: LoaderService,
  ) {}

  ngOnInit() {
    this.query$.pipe(
      // query should either be empty (full search) or consist of at least 3 non-space chars
      filter(query => query === '' || (query.length >= 3 && !(/^[\s]+$/g).test(query))),
      debounceTime(250),
      distinctUntilChanged()
    ).subscribe(query => {
      this.start$.next(0);
      this.queryAndStart$.next({ query, start: 0 });
    });

    this.start$.pipe(
      filter(s => s >= 0),  // start shouldn't be negative
      distinctUntilChanged(),
      withLatestFrom(this.query$),
    ).subscribe(([start, query]) => this.queryAndStart$.next({ start, query }));

    this.coursesService.getCourses(this.queryAndStart$)
      .subscribe(courses => {
        this.done = courses.length < this.config.coursesPageLength;

        this.courses = this.orderByPipe.transform(
          this.append ? [...this.courses, ...courses] : courses,
        );

        this.append = false;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { currentValue, previousValue, firstChange } = changes.query;

    if (!firstChange && currentValue !== previousValue) {
      this.query$.next(currentValue);
    }
  }

  onEdit(id: number) {
    this.router.navigateByUrl(`${appRoutingPaths.courses}/${id}`);
  }

  onDelete(id: number) {
    this.dialogService
      .confirm('Do you really want to delete this course?')
      .subscribe(confirmed => {
        if (confirmed) {
          this.coursesService.deleteCourse(id)
            .subscribe(() => this.start$.next(0));
        }
      });
  }

  onLoadClick() {
    this.append = true;
    this.start$.next(this.courses.length);
  }
}
