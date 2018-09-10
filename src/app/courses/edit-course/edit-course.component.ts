import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import {
  getCourse,
  GetCourse,
  ResetCourse,
  UpdateCourse,
  CoursesState,
  getCourseAuthors,
} from '../store';

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
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    creationDate: new FormControl(Date.now()),
    durationMin: new FormControl(0),
    authors: new FormControl([]),
  });

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
          const { id, title, description, creationDate, durationMin, authorIds } = course;

          this.id = id;

          this.store.select(getCourseAuthors)
            .subscribe(authors => this.course.setValue({ title, description, creationDate, durationMin, authors }));
        }
      }));
    this.sub.add(this.route.params.subscribe(params => this.store.dispatch(new GetCourse(+params.id))));
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetCourse());
  }

  onSave() {
    this.course.controls.authors.markAsPending();
    this.course.controls.authors.updateValueAndValidity();

    if (this.course.valid) {
      const { title, description, durationMin, creationDate, authors } = this.course.value;
      const authorIds = authors.map(a => a.id);
      const id = this.id;
      this.store.dispatch(new UpdateCourse({ id, title, description, durationMin, creationDate, authorIds }));
    }
  }

  onCancelClick() {
    this.router.navigateByUrl(appRoutingPaths.courses);
  }
}
