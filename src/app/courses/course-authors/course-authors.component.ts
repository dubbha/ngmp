import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '../../material/material.module';
import {
  FormControl,
  ControlValueAccessor,
  Validators,
  Validator,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { CoursesState, GetAuthors, getAuthors } from '../store';

import { map, tap, startWith } from 'rxjs/operators';

import { Author } from '../models';

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
  authorsCtrl = new FormControl('', [Validators.required]);   // this.validate.bind(this)
  onChange: Function;

  courseAuthors: Author[] = [];
  allAuthors: Author[] = [];
  filteredAllAuthors: Author[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  addOnBlur = false;

  @ViewChild('authorsInput') authorsInput: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<CoursesState>,
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetAuthors());
    this.store.select(getAuthors).subscribe(next => this.allAuthors = next);

    this.authorsCtrl.valueChanges.pipe(
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

  add(event: MatChipInputEvent): void {
    const { input, value } = event;

    if (value) {
      const foundAuthor = this.allAuthors
        .filter(this.isAuthorNotYetSelected)
        .find(a => a.name.startsWith(value.trim()));

      console.log('add event, found:', foundAuthor);

      if (foundAuthor) {
        this.courseAuthors.push(foundAuthor);
        this.onChange();
      }
    }

    if (input) {
      input.value = '';
    }

    this.authorsCtrl.setValue(null);
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
  }

  isAuthorNotYetSelected = (author) => !this.courseAuthors.some(alreadySelected => author.id === alreadySelected.id);

  writeValue(value) {
    console.log('write', value);
    this.courseAuthors = value;
  }

  registerOnChange(fn) {
    this.onChange = () => {
      console.log('onChange', this.courseAuthors);
      fn(this.courseAuthors);
    };
  }

  registerOnTouched(fn) {}

  validate(c: FormControl) {
    console.log('validate');
    console.log(this.authorsInput);
    return this.courseAuthors && this.courseAuthors.length ? null : { required: true };
  }
}

// https://material.angular.io/components/autocomplete/overview
// https://material.angular.io/components/chips/overview
// https://stackblitz.com/angular/moynkppaveam?file=app%2Fchips-autocomplete-example.html
