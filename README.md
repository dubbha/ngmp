# Angular Mentoring

## Task 10. NgRx
 - One-way data flow thanks to @ngrx/store
 - No direct HTTP client service method calls, server communications initialized by @ngrx/effects
 - Redux DevTools chrome extension used thanks to @ngrx/store-devtools, logOnly in production
 - CoreModule store serving the application-wide configuration
 - SharedModule store serving the authentication and user data
 - CoursesModule store is lazy-loaded as the module itself, serving the courses data
 - AuthService and UserService are now separated, using the store
 - AuthGuard is now using the store
 - LoaderService using a combination of isLoading selectors
 - All the CoursesModule components are using the store selectors and actions
 - CoursesService is using the store
 - LoginComponent, HeaderComponent, BreadcrumbsComponent are using the store
 - @AutoUnsubscribe() decorator added to unsubscribe components, AOT-aware

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
