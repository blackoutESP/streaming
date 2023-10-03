import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamingRoutingModule } from './streaming-routing.module';
import { StreamingComponent } from './streaming.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';


@NgModule({
  declarations: [
    StreamingComponent
  ],
  imports: [
    CommonModule,
    StreamingRoutingModule,
    AngularMaterialModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class StreamingModule { }
