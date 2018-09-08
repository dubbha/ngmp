import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { getCourse, GetCourse, ResetCourse, UpdateCourse, CoursesState } from '../store';

import { Subscription, Subscriber } from 'rxjs';

import { appRoutingPaths } from '../../app.routing.paths';
import { AutoUnsubscribe } from '../../core/decorators';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.sass']
})
@AutoUnsubscribe()
export class EditCourseComponent implements OnInit, OnDestroy {
  course = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
  });
  creationDate = new FormControl();
  durationMin = new FormControl();

  public sub: Subscription;

  private id: number;

  constructor(
    private store: Store<CoursesState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.sub = new Subscriber();
    this.sub.add(this.store.select(getCourse)
      .subscribe(course => {
        if (course) {
          const { id, title, description, creationDate, durationMin } = course;

          this.id = id;
          this.course.setValue({ title, description });
          this.creationDate.setValue(creationDate);
          this.durationMin.setValue(durationMin);
        }
      }));
    this.sub.add(this.route.params.subscribe(params => this.store.dispatch(new GetCourse(+params.id))));
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetCourse());
  }

  onSaveClick() {
    this.store.dispatch(new UpdateCourse({
      id: this.id,
      ...this.course.value,
      creationDate: this.creationDate.value,
      durationMin: this.durationMin.value,
    }));
  }

  onCancelClick() {
    this.router.navigateByUrl(appRoutingPaths.courses);
  }
}
