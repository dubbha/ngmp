import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription, Subscriber } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Course } from '../course-list/course-list-item/course.model';
import { CoursesService } from '../courses.service';
import { LoaderService } from '../../shared/services';

import { appRoutingPaths } from '../../app.routing.paths';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.sass']
})
export class EditCourseComponent implements OnInit, OnDestroy {
  course: Course;
  title: string;
  description: string;

  public sub: Subscription;

  constructor(
    private coursesService: CoursesService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loaderService.start();
    this.sub = new Subscriber();
    this.sub.add(this.route.params.subscribe(params => {
      this.sub.add(this.coursesService.getCourse(+params.id)
        .pipe(finalize(() => this.loaderService.stop()))  // stop the loader on both success or failure
        .subscribe(course => {
          this.course = course;
        }));
    }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onDurationChange(durationMin: number) {
    this.course.durationMin = durationMin;
  }

  onDateChange(dateUnixMsecs: number) {  // Unix epoch, msecs
    this.course.creationDate = dateUnixMsecs;
  }

  onSaveClick() {
    this.coursesService.updateCourse(this.course).subscribe(() => this.router.navigateByUrl(appRoutingPaths.courses));

  }

  onCancelClick() {
    this.router.navigateByUrl(appRoutingPaths.courses);
  }

}
