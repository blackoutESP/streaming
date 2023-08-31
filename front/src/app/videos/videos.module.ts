import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MaterialUIModule } from './angular-material-ui.module';

import { VideosComponent } from './videos.component';

@NgModule({
  declarations: [
    VideosComponent
  ],
  imports: [
    MaterialUIModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VideosModule { }
