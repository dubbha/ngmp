# Angular Mentoring

## Task 11. Forms
 - Authors added to the application: server, services, store.
 - ReactiveFormsModule replaced FormsModule across the application
 - CourseDurationComponent is a custom form control implementing ControlValueAccessor and Validator
 - CourseDateComponent is a custom form control implementing ControlValueAccessor and Validator
 - CourseAuthorsComponent is a custom form control implementing ControlValueAccessor and Validator
 - CourseAuthorsComponent is a Cloud Tags Input: a combination of MatChipList and MatAutocomplete
 - Build-in Validators used: requried, min, max, pattern
 - CourseAuthorsComponent requires complex validation mechanics due to nesting and untouched submit support
 - AddCourseComponent and EditCourseComponent using the custom form controls
 - LoginComponent is using FormGroup with FormControls
 - CourseSearchComponent is using FormControl

## Branches
 - Task1. Webpack/Typescript/Angular Intro
 - Task2. Components
 - Task3. Unit testing
 - Task4. Directives + Pipes
 - Task5. Modules & Services
 - Task6. Change detection
 - Task7. Routing
 - Task8. HTTP
 - Task9. RxJS
 - Task10. NgRx
 - Task11. Forms

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
