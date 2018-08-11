import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, combineLatest } from 'rxjs';
import { map, tap, filter, distinctUntilChanged, switchMap, debounceTime } from 'rxjs/operators';

import { ConfigService } from '../core/services';
import { Course } from './course-list/course-list-item/course.model';

const dayms = 86400000;                       // milliseconds in a day

@Injectable()
export class CoursesService {
  courses: Course[] = [];
  nextId: number;

  constructor(
    @Inject(ConfigService) private config,
    private http: HttpClient,
  ) {}

  isValidQuery(query: string) {
    // Query should either be empty (full search) or consist of at least 3 chars
    return query === '' || (query.length >= 3 && !(/^[\s]+$/g).test(query));
  }

  getCourses(config: {
    query: Observable<string>,
    start: Observable<number>,
    count?: number,
  }): Observable<any> {
    return combineLatest(
      config.query
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          filter(q => this.isValidQuery(q)),
          tap(q => console.log('query', q)),
        ),
      config.start
        .pipe(
          filter(s => s >= 0),  // start shouldn't be negative
          map(s => `${s}`),     // stringify to use as a GET param
          tap(s => console.log('start', s)),
        ),
    ).pipe(switchMap(([query, start]) => {
      console.log('query:', query, 'start:', start);
      const params: { start: string, count: string, query?: string } = { start, count: `${config.count}` };
      if (query !== '') {
        params.query = query;
      }
      return this.http.get(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.courses}`, { params });
    }));
  }

  getCourse(id: number): Observable<any> {
    return this.http.get(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.courses}/${id}`);
  }

  createCourse(partial: Partial<Course>) {
    const { creationDate, title, durationMin, description } = partial; // can't create a top-rated course right away
    const course = new Course(
      this.nextId++,
      creationDate || Date.now(),   // future supported
      title,
      durationMin,
      description,
    );

    return this.http.post(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.courses}`,  course);
  }

  updateCourse(partial: Partial<Course>) {  // GraphQL-like partial update, so using PATCH
    return this.http.patch(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.courses}/${partial.id}`, partial);
  }

  deleteCourse(id: number) {
    return this.http.delete(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.courses}/${id}`);
  }

  isCourseUpcoming(course: Course): boolean {
    return course.creationDate > Date.now();
  }

  isCourseFresh(course: Course): boolean {
    return course.creationDate < Date.now() && course.creationDate >= Date.now() - 14 * dayms;
  }

}
