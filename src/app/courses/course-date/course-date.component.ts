import { Component } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
    { provide: NG_VALUE_ACCESSOR, useExisting: CourseDateComponent, multi: true }
  ],
})
export class CourseDateComponent implements ControlValueAccessor {
  // @Input() creationDate: number;
  // @Output() dateChange = new EventEmitter<number>();
  // form = new FormGroup({
  //   durationMin: new FormControl(0)
  // });
  // onChange: Function;

  // // get durationMin() { return this.form.get('durationMin').value; }

  date: FormControl;
  startDate: moment.Moment;
  onChange: Function;

  // ngOnInit() {
  //   // this.startDate = moment(this.creationDate);
  //   // this.date = new FormControl(moment(this.creationDate));
  // }

  // onDateChange() {
  //   if (this.date.value) { // date is valid
  //     this.dateChange.emit(this.date.value.valueOf());  // valueOf() converts back to milliseconds
  //   }
  // }

  writeValue(value) {
    this.startDate = moment(value);
    this.date = new FormControl(moment(value));
  }

  registerOnChange(fn) {
    this.onChange = () => {
      if (this.date.value) { // date is valid
        fn(this.date.value.valueOf());  // valueOf() converts back to milliseconds
      }
    };
  }

  registerOnTouched(fn) {}
}
