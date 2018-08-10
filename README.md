# Angular Mentoring

## Task 2. Components
- LogoComponent, HeaderComponent, FooterComponent, BreadcrumbsComponent declared in AppModule
- Standalone CourseModule
- CoursesComponent, CourseSearchComponent, CourseListComponent, CourseListItemComponent
- Course model class implementing CourseInterface
- Standalone AuthModule
- UserComponent, AuthService providing a dummy user
- User model class implementing UserInterface
- CourseSearchComponent using ngModel two-way binding, FormsModule imported in CoursesModule
- CourseSearchComponent Search click calls onSearchClick() method logging the input value
- CourseListItemComponent course @Input passing a specific course object
- CourseListItemComponent edit @Output calling a parent method emitting an ID primitive
- CourseListItemComponent delete @Output calling a perent method emitting a complex object
- CourseListComponent onEdit() method logging a course ID primitive argument
- CourseListComponent onDelete() method featuring destructured object parameter typing
- CoursesComponent onLoadClick() logging a MouseEvent object
- Lifecycle hooks logged: OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,AfterViewChecked, OnDestroy
- CoursesService deleteCourse() implemented to be able to watch the onDestroy lifecycle hook
- ngOnChanges() logging the SimpleChanges object
- CourseListComponent using *ngFor to iterate over the courses

## Branches
 - Task1. Webpack/Typescript/Angular Intro
 - Task2. Components

## Run Development Server
```
npm run dev
```
Enjoy @ http://localhost:4200/

## Run Production Build
```
npm run prod
```
Enjoy @ http://localhost:3000/
