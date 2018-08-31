import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { appRoutingPaths } from '../../app.routing.paths';
import { coursesRoutingPaths } from '../courses.routing.paths';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass']
})
export class CoursesComponent {
  @Output() setRoute = new EventEmitter<string>();

  query = '';

  constructor(private router: Router) {}

  onQueryChange(query: string) {
    this.query = query;
  }

  onAddCourse() {
    this.router.navigateByUrl(`${appRoutingPaths.courses}/${coursesRoutingPaths.new}`);
  }
}
