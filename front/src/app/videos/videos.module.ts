import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { VideosComponent } from './videos.component';
import { AngularMaterialModule } from '../angular-material-ui.module';

@NgModule({
  declarations: [
    VideosComponent
  ],
  imports: [
    AngularMaterialModule
  ],
  providers: []
})
export class VideosModule { }
