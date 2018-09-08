import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { CoursesState, CreateCourse } from '../store';

import { LoaderService } from '../../shared/services';
import { appRoutingPaths } from '../../app.routing.paths';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass']
})
export class AddCourseComponent {
  course = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });
  creationDate = new FormControl(Date.now());
  durationMin = new FormControl(0);

  constructor(
    public loaderService: LoaderService,
    private store: Store<CoursesState>,
    private router: Router,
  ) {}

  onSaveClick() {
    this.store.dispatch(new CreateCourse({
      ...this.course.value,
      creationDate: this.creationDate.value,
      durationMin: this.durationMin.value,
    }));
  }

  onCancelClick() {
    this.router.navigateByUrl(appRoutingPaths.courses);
  }

}
