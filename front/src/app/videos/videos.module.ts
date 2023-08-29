import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { VideosComponent } from './videos.component';



@NgModule({
  declarations: [VideosComponent],
  imports: [
    BrowserModule,
    ContainerRoutingModule,
    BrowserAnimationsModule
  ],
  providers: []
})
export class VideosModule { }
