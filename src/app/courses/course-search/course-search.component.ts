import {
  Component,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.sass']
})
export class CourseSearchComponent {
  @Output() queryChange = new EventEmitter<string>();

  query = new FormControl('');

  onQueryChange() {
    this.queryChange.emit(this.query.value);
  }
}
