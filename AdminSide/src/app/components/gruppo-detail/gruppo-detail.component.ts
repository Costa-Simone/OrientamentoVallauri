import { Component } from '@angular/core';
import { GruppiService } from '../../services/gruppi.service';
import { ActivatedRoute, Params } from '@angular/router';
import { PartecipantiService } from '../../services/partecipanti.service';
import { StudentiService } from '../../services/studenti.service';
import { Studente } from '../../models/studente.module';

@Component({
  selector: 'app-gruppo-detail',
  templateUrl: './gruppo-detail.component.html',
  styleUrl: './gruppo-detail.component.css'
})
export class GruppoDetailComponent {

  constructor(private activeRoute:ActivatedRoute ,public gruppiService:GruppiService, private partecipantiService:PartecipantiService,
    public studentiService:StudentiService) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(async (params:Params) => {
      this.gruppiService.GetGruppo(params['id'])
    })

    this.partecipantiService.GetPartecipanti()
  }

  EditStudentPresent(studente:Studente, idGruppo:string) {
    this.studentiService.EditStudentPresent(studente, idGruppo)
  }
}
