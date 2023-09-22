import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { StreamingComponent } from './videos.component';
import { AngularMaterialModule } from '../angular-material-ui.module';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    StreamingComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StreamingModule { }
