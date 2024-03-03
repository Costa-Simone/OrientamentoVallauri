import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';
import { HomePageComponent } from './component/tabs/tabs.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { AppRoutingModule } from './app-routing.module';
import { ChatComponent } from './component/chat/chat.component';
import { LogInComponent } from './component/log-in/log-in.component';
import { HomePage } from './home/home.page';
import { CameraComponent } from './component/camera/camera.component';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, IonicModule.forRoot({})],
  declarations: [AppComponent, HomePageComponent,ChatComponent,HomePage,LogInComponent,CameraComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}