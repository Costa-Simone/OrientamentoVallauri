import { Component } from '@angular/core';
import { GruppiService } from '../../services/gruppi.service';
import { Router } from '@angular/router';
import { Notifica } from '../../models/notifica.module';
import { NotificheService } from '../../services/notifiche.service';

@Component({
  selector: 'app-lista-gruppi',
  templateUrl: './lista-gruppi.component.html',
  styleUrl: './lista-gruppi.component.css'
})
export class ListaGruppiComponent {

  constructor(private router:Router, public gruppiService:GruppiService, private notificheService:NotificheService) {}

  ngOnInit() {
    this.gruppiService.GetGruppi()
  }

  OnGruppoClick(gruppo:any) {
    this.gruppiService.selectedGruppo = gruppo
    this.router.navigateByUrl(`/home/${this.gruppiService.selectedGruppo!["Id"]}/detail`)
  }
}
