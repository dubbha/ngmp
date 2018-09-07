import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { getCourse, GetCourse, ResetCourse, UpdateCourse, CoursesState } from '../store';

import { Subscription, Subscriber } from 'rxjs';

import { Course } from '../course-list/course-list-item/course.model';
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
    private store: Store<CoursesState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.sub = new Subscriber();
    this.sub.add(this.store.select(getCourse).subscribe(next => this.course = next));
    this.sub.add(this.route.params.subscribe(params => this.store.dispatch(new GetCourse(+params.id))));
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetCourse());
    this.sub.unsubscribe();
  }

  onDurationChange(durationMin: number) {
    this.course.durationMin = durationMin;
  }

  onDateChange(dateUnixMsecs: number) {  // Unix epoch, msecs
    this.course.creationDate = dateUnixMsecs;
  }

  onSaveClick() {
    this.store.dispatch(new UpdateCourse(this.course));
  }

  onCancelClick() {
    this.router.navigateByUrl(appRoutingPaths.courses);
  }

}
