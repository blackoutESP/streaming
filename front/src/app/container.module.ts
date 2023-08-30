import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, RouterOutlet } from '@angular/router';
import { ContainerRoutingModule } from './container-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUIModule } from './angular-material-ui.module';
import { Container } from './container.component';

@NgModule({
  declarations: [
    Container
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    RouterOutlet,
    ContainerRoutingModule,
    MaterialUIModule
  ],
  providers: [],
  bootstrap: [Container],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ContainerModule { }
