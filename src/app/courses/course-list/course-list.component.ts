import { Component, Input, OnInit, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { Course } from './course-list-item/course.model';
import { CoursesService } from '../courses.service';
import { OrderByPipe } from './order-by.pipe';
import { DialogService } from '../../material/dialog/dialog.service';
import { appRoutingPaths } from '../../app.routing.paths';
import { ConfigService } from '../../core/services';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.sass']
})
export class CourseListComponent implements OnChanges, OnInit {
  @Input() query: string;

  query$ = new BehaviorSubject<string>('');
  start$ = new BehaviorSubject<number>(0);
  courses: Course[] = [];
  append = false;
  done = false;

  constructor(
    @Inject(ConfigService) private config,
    private coursesService: CoursesService,
    private dialogService: DialogService,
    private orderByPipe: OrderByPipe,
    private router: Router,
  ) {}

  ngOnInit() {
    const args: {
      query: Observable<string>,
      start: Observable<number>,
      count: number,
    } = {
      query: this.query$,
      start: this.start$,
      count: this.config.coursesPageLength,
    };

    console.log('args', args);

    this.coursesService.getCourses(args).subscribe(courses => {
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
      if (this.coursesService.isValidQuery(currentValue)) {
        this.start$.next(0);
        this.query$.next(currentValue);
      }
    }
  }

  loadCourses() {
    this.done = false;
    const args: any = { start: 0, count: this.config.coursesPageLength };
    if (this.query) { // do not set empty line param
      args.query = this.query;
    }

    this.coursesService.getCourses(args).subscribe(courses => {
      if (courses.length < this.config.coursesPageLength) {
        this.done = true;
      }

      this.courses = this.orderByPipe.transform(courses);
    });
  }

  onEdit(id: number) {
    this.router.navigateByUrl(`${appRoutingPaths.courses}/${id}`);
  }

  onDelete(id: number) {
    this.dialogService
      .confirm('Do you really want to delete this course?')
      .subscribe(confirmed => {
        if (confirmed) {
          this.coursesService.deleteCourse(id).subscribe(() => this.loadCourses());
        }
      });
  }

  onLoadClick() {
    this.append = true;
    this.start$.next(this.courses.length);
  }
}
