import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDurationComponent } from './course-duration.component';
import { MaterialModule } from '../../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DurationPipe } from '../course-list/course-list-item/duration.pipe';

describe('CourseDurationComponent', () => {
  let component: CourseDurationComponent;
  let fixture: ComponentFixture<CourseDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseDurationComponent,
        DurationPipe,
      ],
      imports: [
        MaterialModule,           // material is used in the template
        BrowserAnimationsModule,  // required by material
        FormsModule,              // ngModel is used in the template
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on change', () => {
    component.durationMin = 123;
    spyOn(component.durationChange, 'emit');
    component.onChange();
    expect(component.durationChange.emit).toHaveBeenCalledWith(123);
  });
});
