import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
  { path: 'videos/all', component: VideosComponent   },
  { path: 'videos', loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
