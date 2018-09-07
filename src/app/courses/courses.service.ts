import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Course } from './course-list/course-list-item/course.model';

import { Store } from '@ngrx/store';
import { getConfig, ConfigState } from '../core/store';
import { getQueryAndStart } from './store/selectors';  // avoid circular dependencies
import { QueryAndStart, CoursesState } from './store/state';

const dayms = 86400000;  // milliseconds in a day

@Injectable()
export class CoursesService {
  courses: Course[] = [];
  nextId: number;

  private config: ConfigState;
  private queryAndStart: QueryAndStart;

  constructor(
    private configStore: Store<ConfigState>,
    private coursesStore: Store<CoursesState>,
    private http: HttpClient,
  ) {
    this.configStore.select(getConfig).subscribe(next => this.config = next);
    this.coursesStore.select(getQueryAndStart).subscribe(next => this.queryAndStart = next);
  }

  getCourses(): Observable<any> {
    const { query, start } = this.queryAndStart;
    const params: { start: string, count: string, query?: string } = { start: `${start}`, count: `${this.config.coursesPageLength}` };
    if (query !== '') {
      params.query = query;
    }

    return this.http.get(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.courses}`, { params });
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
