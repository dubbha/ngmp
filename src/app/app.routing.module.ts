import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/guards';
import { appRoutingPaths as paths } from './app.routing.paths';

const routes: Routes = [
  { path: paths.courses, canLoad: [AuthGuard], canActivate: [AuthGuard], loadChildren: './courses/courses.module#CoursesModule' },
  { path: paths.login, component: LoginComponent },
  { path: paths.notFound, component: NotFoundComponent },
  { path: '', redirectTo: paths.courses, pathMatch: 'full' },
  { path: '**', redirectTo: paths.notFound },
];

export const appRoutingComponents = [
  LoginComponent,
  NotFoundComponent,
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false }  // enable for debugging
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
