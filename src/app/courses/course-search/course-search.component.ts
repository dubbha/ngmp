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

  // onSearch() {
  //   this.search.emit(this.query);
  // }

  // onSearchClick() {
  //   this.onSearch();
  // }

  // onSubmit(e: Event) {
  //   e.preventDefault();
  //   this.onSearch();
  // }

  onQueryChange(e: Event) {
    this.queryChange.emit(this.query);
  }
}
