import { Component } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-course-duration',
  templateUrl: './course-duration.component.html',
  styleUrls: ['./course-duration.component.sass'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CourseDurationComponent,
    multi: true
  }]
})
export class CourseDurationComponent implements ControlValueAccessor {
  form = new FormGroup({
    durationMin: new FormControl(0)
  });
  onChange: Function;

  get durationMin() { return this.form.get('durationMin').value; }

  writeValue(value) {
    this.form.setValue({ durationMin: value });
  }

  registerOnChange(fn) {
    this.onChange = () => fn(this.durationMin);
  }

  registerOnTouched(fn) {}
}
