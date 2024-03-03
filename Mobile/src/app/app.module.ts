import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';
import { HomePageComponent } from './component/tabs/tabs.component';

import { AppRoutingModule } from './app-routing.module';
import { ChatComponent } from './component/chat/chat.component';
import { LogInComponent } from './component/log-in/log-in.component';
import { HomePage } from './home/home.page';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, IonicModule.forRoot({})],
  declarations: [AppComponent, HomePageComponent,ChatComponent,HomePage,LogInComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}