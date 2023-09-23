import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { VideosComponent } from './videos.component';
import { AngularMaterialModule } from 'src/app/angular-material-ui.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { StreamingModule } from './streaming/streaming.module';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    VideosComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    OverlayModule,
    AngularMaterialModule,
    StreamingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VideosModule { }
