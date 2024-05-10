import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TabsComponent } from './component/tabs/tabs.component';
import { LogInComponent } from './component/log-in/log-in.component';
import { ChatComponent } from './component/chat/chat.component';
import { HomePage } from './component/home/home.page';
import { CameraComponent } from './component/camera/camera.component';
import { LabDetailComponent } from './component/lab-detail/lab-detail.component';

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
            path:'chat',
            component:ChatComponent
          },
          {
            path:'camera',
            component: CameraComponent
          },
          {
            path: 'details',
            component: LabDetailComponent,
          }
        ]
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}