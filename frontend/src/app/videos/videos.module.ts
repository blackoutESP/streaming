import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { VideosComponent } from './videos.component';
import { AngularMaterialModule } from '../angular-material-ui.module';

@NgModule({
  declarations: [

  ],
  imports: [
    AngularMaterialModule
  ],
  providers: [AngularMaterialModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VideosModule { }
