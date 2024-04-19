import { Component } from '@angular/core';
import { GruppiService } from '../../services/gruppi.service';
import { ActivatedRoute, Params } from '@angular/router';
import { PartecipantiService } from '../../services/partecipanti.service';
import { StudentiService } from '../../services/studenti.service';
import { Studente } from '../../models/studente.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gruppo-detail',
  templateUrl: './gruppo-detail.component.html',
  styleUrl: './gruppo-detail.component.css'
})
export class GruppoDetailComponent {

  constructor(private activeRoute: ActivatedRoute, public gruppiService: GruppiService, private partecipantiService: PartecipantiService,
    public studentiService: StudentiService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(async (params: Params) => {
      this.gruppiService.GetGruppo(params['id'])
    })

    this.partecipantiService.GetPartecipanti()
    this.gruppiService.GetGruppi()
  }

  EditStudente(studente: Studente) {
    let aus = ""

    this.gruppiService.gruppi.forEach(gruppo => {
      aus += `<option value="${gruppo.Id}">${gruppo.Id}</option>`
    })

    Swal.fire({
      title: "Moficia studente: " + studente.Nominativo,
      html: `
      <select id="gruppo" class="form-select" aria-label="Gruppo">
      ${aus}
      </select>`,
      didOpen: () => {
        (document.getElementById('gruppo') as HTMLSelectElement).value = this.gruppiService.selectedGruppo?.Id!
      },
      showCancelButton: true,
      confirmButtonText: "Modifica",
      cancelButtonText: "Annulla"
    }).then(result => {
      if(result.isConfirmed) {
        this.studentiService.EditStudentGroup(studente, (document.getElementById('gruppo') as HTMLSelectElement).value, this.gruppiService.selectedGruppo?.Id!)
      }
    })
  }

  EditStudentPresent(studente: Studente, idGruppo: string) {
    this.studentiService.EditStudentPresent(studente, idGruppo)
  }
}
