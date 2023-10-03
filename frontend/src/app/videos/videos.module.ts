import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [
    VideosComponent
  ],
  imports: [
    CommonModule,
    VideosRoutingModule,
    AngularMaterialModule
  ]
})
export class VideosModule { }
