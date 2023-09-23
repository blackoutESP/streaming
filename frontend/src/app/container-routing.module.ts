import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Container } from './container.component';
import { VideosComponent } from './videos/videos.component';
import { StreamingComponent } from './videos/streaming/streaming.component';

const routes: Routes = [
  { path: '', component: Container },
  {
    path: 'videos', component: VideosComponent, children: [
      { path: 'streaming', component: StreamingComponent },
      { path: 'streaming', loadChildren: () => import('./videos/streaming/streaming.module').then(m => m.StreamingModule) }
    ]
  },
  // { path: 'videos/:id', loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
