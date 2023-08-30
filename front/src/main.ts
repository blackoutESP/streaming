import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ContainerRoutingModule } from './app/container-routing.module';


platformBrowserDynamic().bootstrapModule(ContainerRoutingModule)
  .catch(err => console.error(err));
