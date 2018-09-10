import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { coursesReducer, CoursesEffects } from './store';

import { MaterialModule } from '../material/material.module';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseListItemComponent } from './course-list/course-list-item/course-list-item.component';
import { CoursesService } from './courses.service';
import { DurationPipe } from './course-list/course-list-item/duration.pipe';
import { OrderByPipe } from './course-list/order-by.pipe';
import { SearchPipe } from './course-search/search.pipe';
import { HighlightDirective } from './course-list/course-list-item/highlight.directive';
import { CoursesListNoDataComponent } from './course-list/courses-list-no-data/courses-list-no-data.component';
import { CourseAddButtonComponent } from './course-add-button/course-add-button.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CourseDateComponent } from './course-date/course-date.component';
import { CourseDurationComponent } from './course-duration/course-duration.component';
import { CourseAuthorsComponent } from './course-authors/course-authors.component';

import { CoursesRoutingModule, coursesRouterComponents } from './courses.routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    StoreModule.forFeature('courses', coursesReducer),
    EffectsModule.forFeature([CoursesEffects]),
  ],
  declarations: [
    CourseListComponent,
    CourseSearchComponent,
    CourseListItemComponent,
    DurationPipe,
    OrderByPipe,
    SearchPipe,
    HighlightDirective,
    CoursesListNoDataComponent,
    CourseAddButtonComponent,
    BreadcrumbsComponent,
    CourseDateComponent,
    CourseDurationComponent,
    CourseAuthorsComponent,
    coursesRouterComponents
  ],
  providers: [
    CoursesService,
    OrderByPipe,
    SearchPipe,
  ],
  exports: [],
})
export class CoursesModule {}
