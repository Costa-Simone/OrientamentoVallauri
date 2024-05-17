import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TabsComponent } from './component/tabs/tabs.component';
import { LogInComponent } from './component/log-in/log-in.component';
import { HomePage } from './component/home/home.page';
import { CameraComponent } from './component/camera/camera.component';
import { LabDetailComponent } from './component/lab-detail/lab-detail.component';
import { ChatListComponent } from './component/chat/chat-list/chat-list.component';
import { ChatComponent } from './component/chat/chat/chat.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: LogInComponent,
      },
      {
        path: 'home',
        redirectTo: 'home/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: TabsComponent,
        children: [
          {
            path: 'home',
            component: HomePage,
          },
          {
            path: 'camera',
            component: CameraComponent,
          },
          {
            path: 'chat',
            component: ChatListComponent,
          },
          {
            path: 'details',
            component: LabDetailComponent,
          },
          {
            path: 'chat/:id',
            component: ChatComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
