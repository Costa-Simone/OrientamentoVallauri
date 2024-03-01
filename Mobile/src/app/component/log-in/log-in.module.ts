import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LogInComponent } from './log-in.component';

@NgModule({
  imports: [IonicModule, RouterModule.forChild([{ path: '', component: LogInComponent }])],
  declarations: [LogInComponent],
  exports: [LogInComponent],
})
export class ChatPageModule {}