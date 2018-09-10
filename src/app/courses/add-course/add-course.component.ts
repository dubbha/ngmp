import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';

import { Store } from '@ngrx/store';
import { CoursesState, CreateCourse, GetAuthors, getAuthors } from '../store';

import { map, tap, startWith } from 'rxjs/operators';

import { LoaderService } from '../../shared/services';
import { appRoutingPaths } from '../../app.routing.paths';
import { Author } from '../models';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass']
})
export class AddCourseComponent {
  course = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  });
  creationDate = new FormControl(Date.now());
  durationMin = new FormControl(0);
  authors = new FormControl([]);

  constructor(
    public loaderService: LoaderService,
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
    console.log(this.course.valid);
    console.log(this.creationDate.valid);
    console.log(this.durationMin.valid);
    console.log(this.creationDate.value);
    console.log(this.durationMin.value);
    console.log(this.authors.value);
    console.log(this.authors.errors);

    if (this.course.valid && this.creationDate.valid && this.durationMin.valid) {
      this.store.dispatch(new CreateCourse({
        ...this.course.value,
        creationDate: this.creationDate.value,
        durationMin: this.durationMin.value,
      }));
    }
  }

  onCancelClick() {
    this.router.navigateByUrl(appRoutingPaths.courses);
  }
}
