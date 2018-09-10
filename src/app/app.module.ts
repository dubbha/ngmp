import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule, appRoutingComponents } from './app.routing.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    appRoutingComponents,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
