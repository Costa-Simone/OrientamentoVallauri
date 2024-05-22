import { Component } from '@angular/core';
import { GruppiService } from '../../services/gruppi.service';

@Component({
  selector: 'app-percorso',
  templateUrl: './percorso.component.html',
  styleUrl: './percorso.component.css'
})
export class PercorsoComponent {

  constructor(public gruppiService:GruppiService) {}

  ngOnInit() {
    if(this.gruppiService.laboratori.length == 0) {
      this.gruppiService.GetLaboratori()
      this.gruppiService.GetOrariByLab(this.gruppiService.selectedIndirizzoLab)
    }
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.gruppiService.laboratori.forEach(lab => {
        if(lab["IdGruppo"] != "FFF") {
          let orario = this.gruppiService.orariLab.find(orario => orario["IdGruppo"] == lab["IdGruppo"])
          let aus = orario["OrarioPrevistoIngresso"].split(":")
          let h = +orario[0]
          let m = +orario[1]
          let time = 0;
          let date = new Date().toLocaleTimeString()
          // console.log(date)

          switch(this.gruppiService.selectedIndirizzoLab) {
            case "C":
              time = 10
              break

            case "L":
              time = 20
              break
          }

          // (document.getElementById(lab["IdGruppo"]) as HTMLInputElement).style.width = ()
        }
      })
    }, 1000)
  }
}
