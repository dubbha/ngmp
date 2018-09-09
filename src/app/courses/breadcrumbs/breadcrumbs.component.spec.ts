import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { of } from 'rxjs';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { MaterialModule } from '../../material/material.module';
import { CoursesService } from '../courses.service';
import { Course } from '../models';

import { RouterStub } from '../../testing/router-stubs';
import { appRoutingPaths } from '../../app.routing.paths';
import { coursesRoutingPaths } from '../courses.routing.paths';


describe('BreadcrumbsComponent', () => {
  const coursesServiceStub: Partial<CoursesService> = {
    getCourse: () => of(new Course(42, 1234567890, 'Title', 120, '')),
  };

  let component: BreadcrumbsComponent;
  let service: CoursesService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent],
      imports: [MaterialModule],
      providers: [
        BreadcrumbsComponent,
        { provide: CoursesService, useValue: coursesServiceStub },
        { provide: Router, useClass: RouterStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(BreadcrumbsComponent);
    service = TestBed.get(CoursesService);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init breadcrumbs based on the current router url on init', () => {
    router.navigateByUrl(appRoutingPaths.courses);
    component.ngOnInit();
    expect(component.breadCrumbs).toEqual([{ text: 'Courses' }]);
  });

  it('should support URLs starting with slash', () => {
    router.navigateByUrl(`/${appRoutingPaths.courses}`);
    component.ngOnInit();
    expect(component.breadCrumbs).toEqual([{ text: 'Courses' }]);
  });

  it('should reflect new course being added', () => {
    router.navigateByUrl(`${appRoutingPaths.courses}/${coursesRoutingPaths.new}`);
    component.ngOnInit();
    expect(component.breadCrumbs).toEqual([
      { text: 'Courses', path: appRoutingPaths.courses },
      { text: 'New' },
    ]);
  });

  it('should reflect an existing course being edited', () => {
    router.navigateByUrl(`${appRoutingPaths.courses}/42`);
    component.ngOnInit();

    expect(component.breadCrumbs).toEqual([
      { text: 'Courses', path: appRoutingPaths.courses },
      { text: 'Title' },
    ]);
  });

  it('should get course details to display a title of an existing course being edited', () => {
    spyOn(service, 'getCourse').and.callThrough();
    router.navigateByUrl(`${appRoutingPaths.courses}/42`);
    component.ngOnInit();
    expect(service.getCourse).toHaveBeenCalled();
  });

  it('should display a linked courses breadcrumb in case of unknown second url segment', () => {
    router.navigateByUrl(`${appRoutingPaths.courses}/not-new-or-numeric`);
    component.ngOnInit();
    expect(component.breadCrumbs).toEqual([{ text: 'Courses', path: appRoutingPaths.courses }]);
  });

  it('should display default breadcrumbs for an unknown top level URL segment', () => {
    router.navigateByUrl('unknown-top-level-url-segment');
    component.ngOnInit();
    expect(component.breadCrumbs).toEqual([{ text: 'Bread' }, { text: 'Crumbs' }]);
  });

  it('should navigate on click', () => {
    spyOn(router, 'navigateByUrl');
    component.go(`${appRoutingPaths.courses}/${coursesRoutingPaths.new}`);
    expect(router.navigateByUrl).toHaveBeenCalledWith(`${appRoutingPaths.courses}/${coursesRoutingPaths.new}`);
  });
});
