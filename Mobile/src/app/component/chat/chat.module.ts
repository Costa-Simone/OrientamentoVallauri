import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ChatComponent } from './chat.component';

@NgModule({
  imports: [IonicModule, RouterModule.forChild([{ path: '', component: ChatComponent }])],
  declarations: [ChatComponent],
  exports: [ChatComponent],
})
export class ChatPageModule {}