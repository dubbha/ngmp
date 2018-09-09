import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CourseListItemComponent } from './course-list-item.component';
import { Course } from '../../models';
import { MaterialModule } from '../../../material/material.module';
import { DurationPipe } from './duration.pipe';

import mouseEvent from '../../../testing/mouse-event.stub';

describe('CourseListItemComponent', () => {
  const course: Course = {
    id: 42,
    creationDate: 1530287255000,
    title: 'the Ultimate Course',
    durationMin: 123,
    description: 'on Life, the Universe, and Everything',
  };

  describe('component class testing', () => {
    it('should instantiate successfully', () => {
      const component = new CourseListItemComponent();
      expect(component).toBeDefined();
    });

    it('should emit input course ID on Edit click', () => {
      const component = new CourseListItemComponent();
      component.course = course;

      component.edit.subscribe(id => expect(id).toBe(course.id));
      component.onEditClick();
    });

    it('should emit input course ID on Delete click', () => {
      const component = new CourseListItemComponent();
      component.course = course;

      component.delete.subscribe((id) => expect(id).toBe(course.id));
      component.onDeleteClick();
    });
  });

  // https://angular.io/guide/testing#test-dashboardherocomponent-stand-alone
  describe('component DOM testing: stand-alone', () => {
    let component: CourseListItemComponent;
    let fixture: ComponentFixture<CourseListItemComponent>;

    // https://angular.io/guide/testing#compile-components
    beforeEach(async(() => {
      spyOn(console, 'log');

      TestBed.configureTestingModule({
        declarations: [
          CourseListItemComponent,
          DurationPipe,
        ],
        imports: [MaterialModule],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CourseListItemComponent);
      component = fixture.componentInstance;
    });

    it('should instantiate successfully', () => {
      expect(component).toBeDefined();
    });

    it('should display the passed course title', () => {
      // https://angular.io/guide/testing#detectchanges
      component.course = course;
      fixture.detectChanges();

      // https://angular.io/guide/testing#nativeelement
      const courseElement: HTMLElement = fixture.nativeElement;

      const title = courseElement.querySelector('mat-card-title');

      expect(title.textContent.trim()).toEqual(course.title.toUpperCase());
    });

    it('should display the passed course description', () => {
      component.course = course;
      fixture.detectChanges();

      // https://angular.io/guide/testing#debugelement
      const courseDe: DebugElement = fixture.debugElement;
      const courseEl: HTMLElement = courseDe.nativeElement;

      const title = courseEl.querySelector('mat-card-content');

      expect(title.textContent.trim()).toEqual('on Life, the Universe, and Everything');
    });

    it('should display the parsed course duration correctly', () => {
      component.course = course;
      fixture.detectChanges();

      // https://angular.io/guide/testing#bycss
      const courseDe: DebugElement = fixture.debugElement;
      const timeDe: DebugElement = courseDe.query(By.css('.course-list-item__details div'));
      const time: HTMLElement = timeDe.nativeElement;
      expect(time.textContent).toEqual('2h 03min');
    });

    it('should display the parsed course creation date correctly', () => {
      component.course = course;
      fixture.detectChanges();

      const courseDe: DebugElement = fixture.debugElement;
      const timeDe: DebugElement = courseDe.query(By.css('.course-list-item__details div:nth-of-type(2)'));
      const time: HTMLElement = timeDe.nativeElement;
      expect(time.textContent).toEqual('29/06/2018');
    });

    it('should emit input course ID on Edit button click', () => {
      component.course = course;
      fixture.detectChanges();

      const courseDe: DebugElement = fixture.debugElement;
      const buttonDe: DebugElement = courseDe.query(By.css('[mat-raised-button]:nth-of-type(1)'));

      component.edit.subscribe(id => expect(id).toBe(course.id));
      buttonDe.triggerEventHandler('click', null);
    });

    it('should emit input course ID on Delete button click', () => {
      component.course = course;
      fixture.detectChanges();

      const courseDe: DebugElement = fixture.debugElement;
      const buttonDe: DebugElement = courseDe.query(By.css('[mat-raised-button]:nth-of-type(2)'));

      component.delete.subscribe(id => expect(id).toBe(course.id));
      buttonDe.triggerEventHandler('click', null);
    });
  });

  // https://angular.io/guide/testing#component-inside-a-test-host
  describe('component DOM testing: inside a test host', () => {
    // Test host class
    @Component({
      template: `
        <app-course-list-item
        [course]="course"
        (delete)="onDelete($event)"
        (edit)="onEdit($event)"
        ></app-course-list-item>`
    })
    class TestHostComponent {
      course: Course = course;
      onEdit(id: number) { console.log(`onEdit ${id}`); }
      onDelete(id: number) { console.log(`onDelete ${id}`); }
    }

    let testHost: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
      spyOn(console, 'log');

      TestBed.configureTestingModule({
        declarations: [
          CourseListItemComponent,
          TestHostComponent,
          DurationPipe,
        ],
        imports: [MaterialModule],  // material is used in the template
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestHostComponent);
      testHost = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should display the passed course title', () => {
      const testHostElement: HTMLElement = fixture.nativeElement;
      const title = testHostElement.querySelector('mat-card-title');

      expect(title.textContent.trim()).toEqual(course.title.toUpperCase());
    });

    it('should call host onEdit() method on Edit button click', () => {
      const testHostElement: HTMLElement = fixture.nativeElement;
      const button: HTMLElement = testHostElement.querySelector('[mat-raised-button]');

      spyOn(testHost, 'onEdit');

      button.click();

      expect(testHost.onEdit).toHaveBeenCalledWith(42);
    });

    it('should log to console on Edit button click', () => {
      const testHostElement: HTMLElement = fixture.nativeElement;
      const button: HTMLElement = testHostElement.querySelector('[mat-raised-button]');

      button.click();

      expect(console.log).toHaveBeenCalledWith('onEdit 42');
    });

    it('should call host onDelete() method on Delete button click', () => {
      const testHostDe: DebugElement = fixture.debugElement;
      const buttonDe: DebugElement = testHostDe.query(By.css('[mat-raised-button]:nth-of-type(2)'));

      spyOn(testHost, 'onDelete');

      buttonDe.triggerEventHandler('click', mouseEvent);

      expect(testHost.onDelete).toHaveBeenCalledWith(42);
    });

    it('should log to console on Edit button click', () => {
      const testHostDe: DebugElement = fixture.debugElement;
      const buttonDe: DebugElement = testHostDe.query(By.css('[mat-raised-button]:nth-of-type(2)'));

      buttonDe.triggerEventHandler('click', mouseEvent);

      expect(console.log).toHaveBeenCalledWith('onDelete 42');
    });
  });
});
