import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerRoutingModule } from '../container-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { VideosComponent } from './videos.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [VideosComponent],
  imports: [
    // CommonModule,
    // BrowserModule,
    ContainerRoutingModule,
    // BrowserAnimationsModule,
  ],
  providers: []
})
export class VideosModule { }
