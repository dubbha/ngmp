# Angular Mentoring

## Task 10. NgRx
 - CoreModule store serving the application-wide configuration
 - SharedModule store serving the authentication and user data
 - CoursesModule store is lazy-loaded as the module itself, serving the courses data
 - AuthService and UserService are now separated, using the store
 - LoaderService using a combination of isLoading selectors
 - All the CoursesModule components are using the store selectors and actions
 - @AutoUnsubscribe() decorator added to unsubscribe components on destroy, AOT ready

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
 - Task9. NgRx

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
