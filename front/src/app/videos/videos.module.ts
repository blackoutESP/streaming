import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerRoutingModule } from '../container-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { VideosComponent } from './videos.component';
import { Route, RouterOutlet } from '@angular/router';



@NgModule({
  declarations: [VideosComponent],
  imports: [
    BrowserModule,
    ContainerRoutingModule,
    BrowserAnimationsModule,
    RouterOutlet
  ],
  providers: []
})
export class VideosModule { }
