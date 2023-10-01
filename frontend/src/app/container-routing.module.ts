import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Container } from './container.component';
import { VideosComponent } from './videos/videos.component';
import { StreamingComponent } from './videos/streaming/streaming.component';

const routes: Routes = [
    { path: '', component: Container, children: [
      {
        path: 'videos', component: VideosComponent, children: [
          {
            path: 'streaming', component: StreamingComponent
          }
        ]
      }
    ]
  },
  {
    path: 'videos', loadChildren: () => import('src/app/videos/videos.module').then(v => v.VideosModule)
  },
  {
    path: 'streaming', loadChildren: () => import('src/app/videos/streaming/streaming.module').then(s => s.StreamingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
