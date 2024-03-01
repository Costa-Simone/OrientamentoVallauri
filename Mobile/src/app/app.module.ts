import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';
import { HomePageComponent } from './component/home-page/home-page.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, IonicModule.forRoot({})],
  declarations: [AppComponent, HomePageComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}