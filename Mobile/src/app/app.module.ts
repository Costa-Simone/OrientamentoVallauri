import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';
import { TabsComponent } from './component/tabs/tabs.component';

import { AppRoutingModule } from './app-routing.module';
import { ChatComponent } from './component/chat/chat.component';
import { HomePage } from './component/home/home.page';
import { CameraComponent } from './component/camera/camera.component';
import { HttpClientModule } from '@angular/common/http';
import { LogInComponent } from './component/log-in/log-in.component';
import { LabDetailComponent } from './component/lab-detail/lab-detail.component';

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot([]), AppRoutingModule, IonicModule.forRoot({}), HttpClientModule,ReactiveFormsModule, FormsModule],
  declarations: [AppComponent, TabsComponent,HomePage,CameraComponent,ChatComponent,LogInComponent,LabDetailComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}