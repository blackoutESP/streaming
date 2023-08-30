import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerRoutingModule } from '../container-routing.module';
import { VideosComponent } from './videos.component';
// import { RouterOutlet } from '@angular/router';
import { MaterialUIModule } from '../angular-material-ui.module';

@NgModule({
  declarations: [VideosComponent],
  imports: [
    CommonModule,
    ContainerRoutingModule,
    MaterialUIModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VideosModule { }
