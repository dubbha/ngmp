import { Component } from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  Validators,
  Validator,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

// https://material.angular.io/components/datepicker/overview#customizing-the-parse-and-display-formats
// https://momentjs.com/docs/#/displaying/format/
const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-course-date',
  templateUrl: './course-date.component.html',
  styleUrls: ['./course-date.component.sass'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: NG_VALUE_ACCESSOR, useExisting: CourseDateComponent, multi: true },
    { provide: NG_VALIDATORS, useExisting: CourseDateComponent, multi: true },
  ],
})
export class CourseDateComponent implements ControlValueAccessor, Validator {
  date: FormControl;
  startDate: moment.Moment;
  onChange: Function;

  writeValue(value) {
    this.startDate = moment(value);
    this.date = new FormControl(moment(value), [Validators.required]);
  }

  registerOnChange(fn) {
    this.onChange = () => {
      console.log(this.date.value);
      if (this.date.value) { // date is valid
        fn(this.date.value.valueOf());  // valueOf() converts back to milliseconds
      } else {
        fn(null);
      }
    };
  }

  registerOnTouched(fn) {}

  validate(c: FormControl) {
    return this.date.errors;
  }
}
