import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Course } from '../course-list/course-list-item/course.model';
import { CoursesService } from '../courses.service';

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
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.course = this.coursesService.getCourse(+params.id);
    });
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
    this.coursesService.updateCourse(this.course);
    this.router.navigateByUrl(appRoutingPaths.courses);
  }

  onCancelClick() {
    this.router.navigateByUrl(appRoutingPaths.courses);
  }

}
