import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ListaGruppiComponent } from './components/lista-gruppi/lista-gruppi.component';
import { GruppoDetailComponent } from './components/gruppo-detail/gruppo-detail.component';
import { StudentiComponent } from './components/studenti/studenti.component';
import { GruppiComponent } from './components/gruppi/gruppi.component';
import { ChatsListComponent } from './components/chats-list/chats-list.component';
import { PercorsoComponent } from './components/percorso/percorso.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "home", component: HomeComponent, children: [
      { path: "", component: ListaGruppiComponent },
      { path: ":id/detail", component: GruppoDetailComponent },
      { path: "studenti", component: StudentiComponent },
      { path: "gruppi", component: GruppiComponent },
      { path: "percorso", component: PercorsoComponent },
      { path: "chat", component: ChatsListComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
