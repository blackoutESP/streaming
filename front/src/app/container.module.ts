import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ContainerRoutingModule } from './container-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUIModule } from './angular-material-ui.module';
import { Container } from './container.component';
import { CommonModule } from '@angular/common';

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
    MaterialUIModule
  ],
  providers: [],
  bootstrap: [Container]

})
export class ContainerModule { }
