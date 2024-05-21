import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { ListaGruppiComponent } from './components/lista-gruppi/lista-gruppi.component';
import { GruppoDetailComponent } from './components/gruppo-detail/gruppo-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { MatButtonModule } from '@angular/material/button';
import { StudentiComponent } from './components/studenti/studenti.component';
import { GruppiComponent } from './components/gruppi/gruppi.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { MatInputModule } from '@angular/material/input';
import { AddGroupComponent } from './components/add-group/add-group.component';
import {MatMenuModule} from '@angular/material/menu';
import { ChatsListComponent } from './components/chats-list/chats-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomeInterceptor } from './interceptors/custome.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ListaGruppiComponent,
    GruppoDetailComponent,
    StudentiComponent,
    GruppiComponent,
    AddStudentComponent,
    AddGroupComponent,
    ChatsListComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomeInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
