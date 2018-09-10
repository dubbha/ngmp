import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { CoursesState, CreateCourse } from '../store';

import { appRoutingPaths } from '../../app.routing.paths';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass']
})
export class AddCourseComponent {
  course = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    creationDate: new FormControl(Date.now()),
    durationMin: new FormControl(0),
    authors: new FormControl([]),
  });

  constructor(
    private store: Store<CoursesState>,
    private router: Router,
  ) {}


  hasError(control, error) {
    return this.course.get(control).hasError(error);
  }

  getError(control, error) {
    return this.course.get(control).errors[error];
  }

  onSave() {
    this.course.controls.authors.markAsPending();
    this.course.controls.authors.updateValueAndValidity();

    if (this.course.valid) {
      const { title, description, durationMin, creationDate, authors } = this.course.value;
      const authorIds = authors.map(a => a.id);
      this.store.dispatch(new CreateCourse({ title, description, durationMin, creationDate, authorIds }));
    }
  }

  onCancelClick() {
    this.router.navigateByUrl(appRoutingPaths.courses);
  }
}
