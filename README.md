# Angular Mentoring

## Task 4. Directives + Pipes
- Custom HighlightDirective to highlight courses card borders for top-rated, fresh, upcoming courses
- Course titles styled in CourseListItemComponent using *ngIf and object-based [ngClass]
- CourseListNoDataComponent displayed *ngIf course list is empty
- Built-in UpperCasePipe used in CourseListItemComponent template
- Built-in DatePipe used in CourseListItemComponent template
- Custom DurationPipe formatting the course duration output in CourseListItemComponent template
- Custom OrderByPipe used in CourseListComponent class to order courses
- Custom SearchPipe used in CourseListComponent class to filter courses based on search query
- Test coverage: 100%

Coverage
```
Chrome 67.0.3396 (Windows 10.0.0): Executed 84 of 84 SUCCESS (4.543 secs / 4.471 secs)
--------------------------------------------------|----------|----------|----------|----------|-------------------|
File                                              |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
--------------------------------------------------|----------|----------|----------|----------|-------------------|
All files                                         |      100 |      100 |      100 |      100 |                   |
 src                                              |      100 |      100 |      100 |      100 |                   |
  polyfills.ts                                    |      100 |      100 |      100 |      100 |                   |
  test.ts                                         |      100 |      100 |      100 |      100 |                   |
 src/app                                          |      100 |      100 |      100 |      100 |                   |
  app.component.ts                                |      100 |      100 |      100 |      100 |                   |
 src/app/auth                                     |      100 |      100 |      100 |      100 |                   |
  auth.module.ts                                  |      100 |      100 |      100 |      100 |                   |
  auth.service.ts                                 |      100 |      100 |      100 |      100 |                   |
 src/app/auth/user                                |      100 |      100 |      100 |      100 |                   |
  user.component.ts                               |      100 |      100 |      100 |      100 |                   |
  user.model.ts                                   |      100 |      100 |      100 |      100 |                   |
 src/app/courses                                  |      100 |      100 |      100 |      100 |                   |
  courses.module.ts                               |      100 |      100 |      100 |      100 |                   |
  courses.service.ts                              |      100 |      100 |      100 |      100 |                   |
 src/app/courses/course-add-button                |      100 |      100 |      100 |      100 |                   |
  course-add-button.component.ts                  |      100 |      100 |      100 |      100 |                   |
 src/app/courses/course-list                      |      100 |      100 |      100 |      100 |                   |
  course-list.component.ts                        |      100 |      100 |      100 |      100 |                   |
  order-by.pipe.ts                                |      100 |      100 |      100 |      100 |                   |
 src/app/courses/course-list/course-list-item     |      100 |      100 |      100 |      100 |                   |
  course-list-item.component.ts                   |      100 |      100 |      100 |      100 |                   |
  course.model.ts                                 |      100 |      100 |      100 |      100 |                   |
  duration.pipe.ts                                |      100 |      100 |      100 |      100 |                   |
  highlight.directive.ts                          |      100 |      100 |      100 |      100 |                   |
 src/app/courses/course-list/courses-list-no-data |      100 |      100 |      100 |      100 |                   |
  courses-list-no-data.component.ts               |      100 |      100 |      100 |      100 |                   |
 src/app/courses/course-search                    |      100 |      100 |      100 |      100 |                   |
  course-search.component.ts                      |      100 |      100 |      100 |      100 |                   |
  search.pipe.ts                                  |      100 |      100 |      100 |      100 |                   |
 src/app/courses/courses                          |      100 |      100 |      100 |      100 |                   |
  courses.component.ts                            |      100 |      100 |      100 |      100 |                   |
 src/app/footer                                   |      100 |      100 |      100 |      100 |                   |
  footer.component.ts                             |      100 |      100 |      100 |      100 |                   |
 src/app/header                                   |      100 |      100 |      100 |      100 |                   |
  header.component.ts                             |      100 |      100 |      100 |      100 |                   |
 src/app/header/breadcrumbs                       |      100 |      100 |      100 |      100 |                   |
  breadcrumbs.component.ts                        |      100 |      100 |      100 |      100 |                   |
 src/app/logo                                     |      100 |      100 |      100 |      100 |                   |
  logo.component.ts                               |      100 |      100 |      100 |      100 |                   |
 src/app/material                                 |      100 |      100 |      100 |      100 |                   |
  material.module.ts                              |      100 |      100 |      100 |      100 |                   |
--------------------------------------------------|----------|----------|----------|----------|-------------------|
```
Run Coverage
```
npm run test:coverage
```


## Branches
 - Task1. Webpack/Typescript/Angular Intro
 - Task2. Components
 - Task3. Unit testing
 - Task4. Directives + Pipes

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
