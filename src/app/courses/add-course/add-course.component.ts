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
export class AddCourseComponent implements OnInit {
  course = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  });
  creationDate = new FormControl(Date.now());
  durationMin = new FormControl(0);
  authors = new FormControl('');

  allAuthors: Author[] = [];
  filteredAllAuthors: Author[];
  courseAuthors: Author[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  addOnBlur = false;

  @ViewChild('authorsInput') authorsInput: ElementRef<HTMLInputElement>;

  constructor(
    public loaderService: LoaderService,
    private store: Store<CoursesState>,
    private router: Router,
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetAuthors());
    this.store.select(getAuthors).subscribe(next => this.allAuthors = next);

    this.authors.valueChanges.pipe(
        tap(console.log),
        startWith(null),
        map((prefix: string | null) => prefix
          ? this.allAuthors
            .filter(this.isAuthorNotYetSelected)
            .filter(a => a.name.startsWith(prefix))
          : this.allAuthors.filter(this.isAuthorNotYetSelected)),
      )
      .subscribe(next => this.filteredAllAuthors = next);
  }

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

  add(event: MatChipInputEvent): void {
    const { input, value } = event;

    console.log('event', event);
    console.log('event.value', event.value);

    // Add author
    if (value) {
      const foundAuthor = this.allAuthors
        .filter(this.isAuthorNotYetSelected)
        .find(a => a.name.startsWith(value.trim()));

      console.log('add event, found:', foundAuthor);

      if (foundAuthor) {
        this.courseAuthors.push(foundAuthor);
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.authors.setValue(null);
  }

  remove(author: Author): void {
    this.courseAuthors = this.courseAuthors.filter(a => !(a.id === author.id));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const { value, viewValue } = event.option;
    const author = new Author(value, viewValue);

    if (this.isAuthorNotYetSelected(author)) {  // avoid duplication on type and then select
      this.courseAuthors.push(new Author(value, viewValue));
    }

    this.authorsInput.nativeElement.value = '';
    this.authors.setValue(null);
  }

  isAuthorNotYetSelected = (author) => !this.courseAuthors.some(alreadySelected => author.id === alreadySelected.id);
}

// https://material.angular.io/components/autocomplete/overview
// https://material.angular.io/components/chips/overview
// https://stackblitz.com/angular/moynkppaveam?file=app%2Fchips-autocomplete-example.html
