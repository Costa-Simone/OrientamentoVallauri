import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './component/home-page/home-page.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: HomePageComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home',
          },
          {
            path: 'home',
            loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
          },
          {
            path: 'chat',
            loadChildren: () => import('./component/chat/chat.module').then((m) => m.ChatPageModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}