import { Component } from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  Validators,
  Validator,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';

@Component({
  selector: 'app-course-duration',
  templateUrl: './course-duration.component.html',
  styleUrls: ['./course-duration.component.sass'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CourseDurationComponent, multi: true },
    { provide: NG_VALIDATORS, useExisting: CourseDurationComponent, multi: true },
  ]
})
export class CourseDurationComponent implements ControlValueAccessor, Validator {
  durationMin = new FormControl(0, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)]);
  onChange: Function;

  writeValue(value) {
    this.durationMin.setValue(value);
  }

  registerOnChange(fn) {
    this.onChange = () => fn(this.durationMin.value);
  }

  registerOnTouched(fn) {}

  validate(c: FormControl) {
    return this.durationMin.errors;
  }
}

// https://blog.angularindepth.com/never-again-be-confused-when-implementing-controlvalueaccessor-in-angular-forms-93b9eee9ee83
// https://medium.com/@tarik.nzl/angular-2-custom-form-control-with-validation-json-input-2b4cf9bc2d73
