import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ContainerModule } from './app/container.module';


platformBrowserDynamic().bootstrapModule(ContainerModule)
  .catch(err => console.error(err));
