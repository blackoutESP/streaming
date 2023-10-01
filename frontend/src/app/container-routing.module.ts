import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Container } from './container.component';
import { VideosComponent } from './videos/videos.component';
import { StreamingComponent } from './videos/streaming/streaming.component';

const routes: Routes = [
  { path: '', component: Container },
  {
    path: 'videos', component: VideosComponent, children: [
      {
        path: 'streaming', component: StreamingComponent
      }
    ]
  },
  {
    path: '', loadChildren: () => import('src/app/videos/streaming/streaming.module').then(s => s.StreamingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
