import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { finalize } from 'rxjs/operators';

import { NewCourse } from '../course-list/course-list-item/course.model';
import { CoursesService } from '../courses.service';
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
    private coursesService: CoursesService,
    private router: Router,
    public loaderService: LoaderService,
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
    this.coursesService.createCourse(this.course)
      .subscribe(() => {
        this.router.navigateByUrl(appRoutingPaths.courses);
      });
  }

  onCancelClick() {
    this.router.navigateByUrl(appRoutingPaths.courses);
  }

}
