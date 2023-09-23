import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamingComponent } from './streaming.component';
import { AngularMaterialModule } from 'src/app/angular-material-ui.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    StreamingComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterOutlet,
    OverlayModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StreamingModule { }
