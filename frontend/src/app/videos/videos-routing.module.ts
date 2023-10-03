import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosComponent } from './videos.component';

const routes: Routes = [
  { path: '', component: VideosComponent,
    children: [
      { path: 'streaming', loadChildren: () => import('./streaming/streaming.module').then(m => m.StreamingModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
