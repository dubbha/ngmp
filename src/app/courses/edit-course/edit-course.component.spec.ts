import { async, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { EditCourseComponent } from './edit-course.component';
import { MaterialModule } from '../../material/material.module';
import { CoursesService } from '../courses.service';
import { Course } from '../models';

import { of } from 'rxjs';

import { RouterStub, ActivatedRouteStub } from '../../testing/router-stubs';
import { appRoutingPaths } from '../../app.routing.paths';

describe('EditCourseComponent', () => {
  const coursesServiceStub: Partial<CoursesService> = {
    getCourse: () => of(new Course(42, 1530287255000, 'title', 100, 'description', [])),
    updateCourse: () => of({ success: true }),
  };

  let component: EditCourseComponent;
  let service: CoursesService;
  let router: Router;
  let route: ActivatedRouteStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditCourseComponent],
      imports: [
        FormsModule,
        MaterialModule,
      ],
      providers: [
        EditCourseComponent,
        { provide: CoursesService, useValue: coursesServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(EditCourseComponent);
    service = TestBed.get(CoursesService);
    router = TestBed.get(Router);
    route = TestBed.get(ActivatedRoute);

    route.testParams = { id: 42 };
  });

  it('should instantiate successfully', () => {
    expect(component).toBeDefined();
  });

  it('should subscribe', () => {
    expect(component.sub).toBeUndefined();
    component.ngOnInit();
    expect(component.sub instanceof Subscription).toBeTruthy();
  });

  it('should unsubscribe', () => {
    component.ngOnInit();
    spyOn(component.sub, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.sub.unsubscribe).toHaveBeenCalled();
  });

  it('should retrieve the course data on init', () => {
    spyOn(service, 'getCourse').and.callThrough();
    component.ngOnInit();
    expect(component.course).toEqual(new Course(42, 1530287255000, 'title', 100, 'description', []));
  });

  it('should receive course duration', () => {
    component.ngOnInit();
    component.onDurationChange(123);
    expect(component.course.durationMin).toBe(123);
  });

  it('should receive course creation date', () => {
    component.ngOnInit();
    component.onDateChange(1234567890);
    expect(component.course.creationDate).toBe(1234567890);
  });

  it('should update course on save', () => {
    spyOn(service, 'updateCourse').and.callThrough();
    component.onSaveClick();
    expect(service.updateCourse).toHaveBeenCalled();
  });

  it('should navigate away on save', () => {
    spyOn(router, 'navigateByUrl');
    component.onSaveClick();
    expect(router.navigateByUrl).toHaveBeenCalledWith(appRoutingPaths.courses);
  });

  it('should navigate away on cancel', () => {
    spyOn(router, 'navigateByUrl');
    component.onCancelClick();
    expect(router.navigateByUrl).toHaveBeenCalledWith(appRoutingPaths.courses);
  });
});
