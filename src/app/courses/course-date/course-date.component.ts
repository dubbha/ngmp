import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class CourseDateComponent implements OnInit {
  @Input() creationDate: number;
  @Output() dateChange = new EventEmitter<number>();

  date: FormControl;
  startDate: moment.Moment;

  ngOnInit() {
    this.startDate = moment(this.creationDate);
    this.date = new FormControl(moment(this.creationDate));

  }

  onDateChange() {
    if (this.date.value) { // date is valid
      this.dateChange.emit(this.date.value.valueOf());  // valueOf() converts back to milliseconds
    }
  }
}
