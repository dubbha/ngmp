import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer, userReducer, AuthEffects, UserEffects } from './store';

import { AuthGuard } from './guards';
import { AuthService, UserService, LoaderService } from './services';
import { LoaderComponent } from './components';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', authReducer),
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([AuthEffects, UserEffects]),
  ],
  declarations: [
    LoaderComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserService,
    LoaderService,
  ],
  exports: [
    LoaderComponent,
  ]
})
export class SharedModule { }
