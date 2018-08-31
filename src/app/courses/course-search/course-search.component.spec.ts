import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CourseSearchComponent } from './course-search.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';

describe('CourseSearchComponent', () => {
  let component: CourseSearchComponent;
  let fixture: ComponentFixture<CourseSearchComponent>;

  const event: any = {
    preventDefault: () => {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseSearchComponent],
      imports: [
        MaterialModule,           // material is used in the template
        BrowserAnimationsModule,   // required by material
        FormsModule,              // ngModel is used in the template
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the search input when ngModel input changes', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    const element = fixture.debugElement.query(By.css('input')).nativeElement;
    element.value = 'neeeedle';

    // https://angular.io/guide/testing#change-an-input-value-with-dispatchevent
    element.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(component.query).toBe('neeeedle');
  }));
});
