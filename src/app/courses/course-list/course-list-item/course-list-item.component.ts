import { Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Course } from '../../models';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListItemComponent implements OnInit {

  @Input() course: Course;

  @Input() isCourseUpcoming: boolean;
  @Input() isCourseFresh: boolean;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  classes: any = {};

  ngOnInit() {
    this.classes.title = {
      'mat-card-title_top-rated': this.course.topRated,
      'mat-card-title_upcoming': this.isCourseUpcoming,
      'mat-card-title_fresh': this.isCourseFresh,
      'color_primary': !this.course.topRated && !this.isCourseUpcoming && !this.isCourseFresh,
    };
  }

  onEditClick() {
    this.edit.emit(this.course.id);
  }

  onDeleteClick() {
    this.delete.emit(this.course.id);
  }

}
