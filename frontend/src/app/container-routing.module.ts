import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Container } from './container.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
  { path: '', component: Container },
  { path: 'videos', component: VideosComponent },
  { path: 'videos', loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
