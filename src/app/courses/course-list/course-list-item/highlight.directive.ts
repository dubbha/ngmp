import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Course } from '../../models';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input() course: Course;

  @Input() isCourseUpcoming: boolean;
  @Input() isCourseFresh: boolean;

  private el: HTMLElement;

  constructor(
    elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    this.el = elementRef.nativeElement;
  }

  ngOnInit() {
    if (this.isCourseFresh) { // fresh
      this.renderer.addClass(this.el.querySelector('mat-card'), 'mat-card_fresh');
    } else if (this.isCourseUpcoming) {  // upcoming
      this.renderer.addClass(this.el.querySelector('mat-card'), 'mat-card_upcoming');
    } else if (this.course.topRated) {
      this.renderer.addClass(this.el.querySelector('mat-card'), 'mat-card_top-rated');
    }
  }

}
