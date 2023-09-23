import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ContainerRoutingModule } from './container-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Container } from './container.component';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { AngularMaterialModule } from './angular-material-ui.module';
import { VideosModule } from './videos/videos.module';

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
    VideosModule,
    OverlayModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [Container]
})
export class ContainerModule { }
