import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { ContainerRoutingModule } from './container-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ContainerRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [ContainerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ContainerModule { }
