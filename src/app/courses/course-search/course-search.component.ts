import {
  Component,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.sass']
})
export class CourseSearchComponent {
  @Output() queryChange = new EventEmitter<string>();

  query = '';

  onQueryChange() {
    this.queryChange.emit(this.query);
  }
}
