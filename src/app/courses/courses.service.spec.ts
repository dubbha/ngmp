import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoursesService } from './courses.service';
import { ConfigService } from '../core/services';
import { Course } from './models';

describe('CoursesService', () => {
  let httpTestingController: HttpTestingController;
  let config: any;

  const dayms = 86400000;  // milliseconds in a day

  const configStub = {
    apiBaseUrl: 'http://base.url/api',
    apiEndpoints: {
      courses: 'COURSES',
    }
  };

  const testCourses: Course[] = [
    new Course(1, 12345678901, 'title1', 121, `desc1`),
    new Course(2, 12345678902, 'title2', 122, `desc2`),
    new Course(3, 12345678903, 'title3', 123, `desc3`),
  ];


  describe('Testing a service using TestBed + inject', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          CoursesService,
          { provide: ConfigService, useValue: configStub },
        ]
      });
    });

    it('should be created', inject([CoursesService], (service: CoursesService) => {
      expect(service).toBeTruthy();
    }));
  });

  // https://angular.io/guide/testing#angular-testbed
  describe('Testing a service using TestBed only', () => {
    let service: CoursesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          CoursesService,
          { provide: ConfigService, useValue: configStub },
        ],
      });

      service = TestBed.get(CoursesService);
      config = TestBed.get(ConfigService);
      httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should get courses', () => {
      const data = testCourses;

      service.getCourses({}).subscribe(res => expect(res).toBe(data));

      const req = httpTestingController.expectOne(`${config.apiBaseUrl}/${config.apiEndpoints.courses}`);
      expect(req.request.method).toEqual('GET');
      req.flush(data);
    });

    it('should forward query and pagination params while getting courses if provided', () => {
      const data = testCourses;

      service.getCourses({ query: 'q', start: 0, count: 3 }).subscribe(res => expect(res).toBe(data));

      const req = httpTestingController.expectOne(`${config.apiBaseUrl}/${config.apiEndpoints.courses}?query=q&start=0&count=3`);
      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('query')).toBe('q');
      expect(req.request.params.get('start')).toBe('0');
      expect(req.request.params.get('count')).toBe('3');
      req.flush(data);
    });

    it('should not forward params that are null', () => {
      const data = testCourses;

      service.getCourses({ query: null, start: 0, count: null }).subscribe(res => expect(res).toBe(data));

      const req = httpTestingController.expectOne(`${config.apiBaseUrl}/${config.apiEndpoints.courses}?start=0`);
      expect(req.request.method).toEqual('GET');
      req.flush(data);
    });

    it('should get course by id', () => {
      const data = [testCourses[0]];

      service.getCourse(testCourses[0].id).subscribe(res => expect(res).toBe(data));

      const req = httpTestingController.expectOne(`${config.apiBaseUrl}/${config.apiEndpoints.courses}/${testCourses[0].id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(data);
    });

    it('should update course', () => {
      const partial = {  // GraphQL-like partial update
        id: 1,
        title: 'TITLE',
      };

      service.updateCourse(partial).subscribe(res => expect(res).toBe('OK'));

      const req = httpTestingController.expectOne(`${config.apiBaseUrl}/${config.apiEndpoints.courses}/${testCourses[0].id}`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(partial);
      req.flush('OK');
    });

    it('should delete course by id', () => {
      service.deleteCourse(1).subscribe(res => expect(res).toBe('OK'));

      const req = httpTestingController.expectOne(`${config.apiBaseUrl}/${config.apiEndpoints.courses}/${testCourses[0].id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush('OK');
    });

    it('should create a course with a specific creation date', () => {
      const data = {
        creationDate: 1234567890111,
        title: 'NEW TITLE',
        durationMin: 120,
        description: 'NEW DESCRIPTION',
      };

      service.createCourse(data).subscribe(res => expect(res).toBe('OK'));

      const req = httpTestingController.expectOne(`${config.apiBaseUrl}/${config.apiEndpoints.courses}`);
      expect(req.request.method).toBe('POST');
      req.flush('OK');
    });

    it('should create a course with a current creation date', () => {
      const originalDateNow = Date.now;

      Date.now = () => 1234567890123;

      const data = {
        title: 'NEW TITLE',
        durationMin: 120,
        description: 'NEW DESCRIPTION',
      };

      service.createCourse(data).subscribe(res => expect(res).toBe('OK'));

      const req = httpTestingController.expectOne(`${config.apiBaseUrl}/${config.apiEndpoints.courses}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body.creationDate).toBe(1234567890123);
      req.flush('OK');

      Date.now = originalDateNow;
    });

    it('should identify a course as upcoming', () => {
      const course = { ...testCourses[0], creationDate: Date.now() + 7 * dayms };
      expect(service.isCourseUpcoming(course)).toBe(true);
    });

    it('should identify a course as fresh', () => {
      const course = { ...testCourses[0], creationDate: Date.now() - 7 * dayms };
      expect(service.isCourseFresh(course)).toBe(true);
    });

    it('should identify a course as not upcoming', () => {
      expect(service.isCourseUpcoming(testCourses[0])).toBe(false);
    });

    it('should identify a course as not fresh', () => {
      expect(service.isCourseFresh(testCourses[0])).toBe(false);
    });
  });
});
