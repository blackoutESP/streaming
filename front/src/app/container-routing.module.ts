import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Container } from './container.component';

const routes: Routes = [
  { path: '', component: Container },
  { path: 'videos/all', loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule)  },
  { path: 'videos/:id', loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
