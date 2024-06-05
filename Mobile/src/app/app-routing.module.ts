import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TabsComponent } from './component/tabs/tabs.component';
import { LogInComponent } from './component/log-in/log-in.component';
import { HomePage } from './component/home/home.page';
import { CameraComponent } from './component/camera/camera.component';
import { LabDetailComponent } from './component/lab-detail/lab-detail.component';
import { ChatComponent } from './component/chat/chat.component';
import { ChatListComponent } from './component/chat-list/chat-list.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: LogInComponent,
      },
      {
        path:'home',
        redirectTo:'home/home',
        pathMatch:'full'
      },
      {
        path: 'home',
        component: TabsComponent,
        children:[
          {
            path:'home',
            component: HomePage,
          },
          {
            path:'camera',
            component: CameraComponent
          },
          {
            path: 'details',
            component: LabDetailComponent,
          },
          {
            path: 'chatList',
            component: ChatListComponent,
          },
          {
            path: 'chat',
            component: ChatComponent,
          },
          {
            path: 'chat/:id',
            component: ChatComponent,
          },
        ]
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}