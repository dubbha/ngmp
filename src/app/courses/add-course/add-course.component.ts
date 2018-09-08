import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { CoursesState, CreateCourse } from '../store';

import { NewCourse } from '../course-list/course-list-item/course.model';
import { LoaderService } from '../../shared/services';
import { appRoutingPaths } from '../../app.routing.paths';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass']
})
export class AddCourseComponent {
  course: NewCourse;

  constructor(
    public loaderService: LoaderService,
    private store: Store<CoursesState>,
    private router: Router,
  ) {
    this.course = new NewCourse(Date.now(), '', 0, '');
  }

  onDurationChange(durationMin: number) {
    this.course.durationMin = durationMin;
  }

  onDateChange(dateUnixMsecs: number) {  // Unix epoch, msecs
    this.course.creationDate = dateUnixMsecs;
  }

  onSaveClick() {
    this.store.dispatch(new CreateCourse(this.course));
  }

  onCancelClick() {
    this.router.navigateByUrl(appRoutingPaths.courses);
  }

}
