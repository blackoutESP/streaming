import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ContainerRoutingModule } from './container-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Container } from './container.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material-ui.module';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    Container
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    RouterOutlet,
    ContainerRoutingModule,
    AngularMaterialModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [Container],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContainerModule { }
