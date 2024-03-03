import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './component/tabs/tabs.component';
import { LogInComponent } from './component/log-in/log-in.component';
import { ChatComponent } from './component/chat/chat.component';
import { HomePage } from './home/home.page';
import { CameraComponent } from './component/camera/camera.component';

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
        component: HomePageComponent,
        children:[
          {
            path:'home',
            component: HomePage
          },
          {
            path:'chat',
            component:ChatComponent
          },
          {
            path:'camera',
            component: CameraComponent
          }
        ]
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}