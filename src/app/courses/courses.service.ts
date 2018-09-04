import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ConfigService } from '../core/services';
import { LoaderService } from '../shared/services';
import { Course } from './course-list/course-list-item/course.model';

const dayms = 86400000;                       // milliseconds in a day

export interface IQueryAndStart {
  query: string;
  start: number;
}

@Injectable()
export class CoursesService {
  courses: Course[] = [];
  nextId: number;

  constructor(
    @Inject(ConfigService) private config,
    private loadingService: LoaderService,
    private http: HttpClient,
  ) {}

  getCourses(queryAndStart: Observable<IQueryAndStart>): Observable<any> {
    return queryAndStart.pipe(
      switchMap(({ query, start }) => {
        const params: { start: string, count: string, query?: string } = { start: `${start}`, count: `${this.config.coursesPageLength}` };
        if (query !== '') {
          params.query = query;
        }

        return this.http.get(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.courses}`, { params });
      })
    );
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
