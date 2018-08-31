import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './guards';
import { AuthService, LoaderService } from './services';
import { LoaderComponent } from './components';


@NgModule({
  imports: [
    CommonModule
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
