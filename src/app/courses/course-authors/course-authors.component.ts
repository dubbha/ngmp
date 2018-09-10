import { Component, OnInit, ElementRef, ViewChild, Optional, Host, SkipSelf } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '../../material/material.module';
import {
  FormControl,
  ControlValueAccessor,
  Validator,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormGroupDirective,
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { CoursesState, GetAuthors, getAuthors } from '../store';

import { map, filter, startWith } from 'rxjs/operators';

import { Author } from '../models';
import { MatChipList } from '../../material/material.module';

@Component({
  selector: 'app-course-authors',
  templateUrl: './course-authors.component.html',
  styleUrls: ['./course-authors.component.sass'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CourseAuthorsComponent, multi: true },
    { provide: NG_VALIDATORS, useExisting: CourseAuthorsComponent, multi: true },
  ],
})
export class CourseAuthorsComponent implements OnInit, ControlValueAccessor, Validator {
  authorsCtrl = new FormControl('');
  onChange: Function;

  courseAuthors: Author[] = [];
  allAuthors: Author[] = [];
  filteredAllAuthors: Author[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  addOnBlur = false;

  @ViewChild('authorsInput') authorsInput: ElementRef<HTMLInputElement>;
  @ViewChild('authorsList') authorsList: MatChipList;

  constructor(
    private store: Store<CoursesState>,
    @Optional() @Host() @SkipSelf() private controlContainer: FormGroupDirective,
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetAuthors());
    this.store.select(getAuthors).subscribe(next => this.allAuthors = next);

    this.authorsCtrl.valueChanges
      .pipe(
        startWith(null),
        map((prefix: string | null) => prefix
          ? this.allAuthors.filter(a => a.name.startsWith(prefix))
          : this.allAuthors),
        map(authors => authors.filter(this.isAuthorNotYetSelected))
      )
      .subscribe(next => this.filteredAllAuthors = next);

    this.controlContainer.statusChanges
      .pipe(filter(next => next === 'PENDING'))  // right before submit
      .subscribe(() => this.updateErrors());     // update validity if was not touched before submit
  }

  add(event: MatChipInputEvent): void {
    const { input, value } = event;

    if (value) {
      const foundAuthor = this.allAuthors
        .filter(this.isAuthorNotYetSelected)
        .find(a => a.name.startsWith(value.trim()));

      if (foundAuthor) {
        this.courseAuthors.push(foundAuthor);
        this.onChange();
      }
    }

    if (input) {
      input.value = '';
    }

    this.authorsCtrl.setValue(null);

    this.updateErrors();
  }

  remove(author: Author): void {
    this.courseAuthors = this.courseAuthors.filter(a => !(a.id === author.id));
    this.onChange();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const { value } = event.option;
    const author = this.allAuthors.find(a => a.id === value);

    if (this.isAuthorNotYetSelected(author)) {  // avoid duplication on type and then select
      this.courseAuthors.push(author);
      this.onChange();
    }

    this.authorsInput.nativeElement.value = '';
    this.authorsCtrl.setValue(null);

    this.updateErrors();
  }

  isAuthorNotYetSelected = author => !this.courseAuthors.some(alreadySelected => author.id === alreadySelected.id);

  writeValue(value) {
    this.courseAuthors = value;
  }

  registerOnChange(fn) {
    this.onChange = () => {
      fn(this.courseAuthors);
    };
  }

  registerOnTouched(fn) {}

  updateErrors() {
    if (!this.authorsInput.nativeElement.value && !this.courseAuthors.length) {
      this.authorsCtrl.setErrors({ required: true });
    } else if (this.authorsInput.nativeElement.value) {
      this.authorsCtrl.setErrors({ invalid: true });
    } else {
      this.authorsCtrl.setErrors(null);
    }

    if (this.authorsCtrl.errors) {
      this.authorsList.errorState = true;
    } else {
      this.authorsList.errorState = false;
    }
  }

  validate(c: FormControl) {
    return this.authorsCtrl.errors;
  }
}

// https://material.angular.io/components/autocomplete/overview
// https://material.angular.io/components/chips/overview
// https://stackblitz.com/angular/moynkppaveam?file=app%2Fchips-autocomplete-example.html
