import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer, AuthEffects } from './store';

import { AuthGuard } from './guards';
import { AuthService, LoaderService } from './services';
import { LoaderComponent } from './components';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [
    LoaderComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    LoaderService,
  ],
  exports: [
    LoaderComponent,
  ]
})
export class SharedModule { }
