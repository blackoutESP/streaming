import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Container } from './container.component';
import { StreamingComponent } from './videos/videos.component';

const routes: Routes = [
  { path: '', component: Container },
  { path: 'streaming', component: StreamingComponent },
  { path: 'streaming', loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule) },
  { path: 'streaming/:id', loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
