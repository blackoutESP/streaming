import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamingComponent } from './streaming.component';
import { AngularMaterialModule } from 'src/app/angular-material-ui.module';
import { RouterOutlet } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';



@NgModule({
  declarations: [
    StreamingComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    OverlayModule,
    AngularMaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StreamingModule { }
