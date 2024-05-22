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
          let h = +aus[0]
          let m = +aus[1]
          let time = 0;
          console.log
          let ausTime = new Date().toLocaleTimeString().split(":")
          let date = ausTime[0] + ":" + ausTime[1]

          switch(this.gruppiService.selectedIndirizzoLab) {
            case "C":
              time = 10
              break

            case "L":
              time = 20
              break
          }

          // x : 100 = ausTime : m + time
          let x = (100 * +ausTime[1]) / (m + time);
          
          (document.getElementById(lab["IdGruppo"]) as HTMLInputElement).style.width = x + "%"
          console.log((document.getElementById(lab["IdGruppo"]) as HTMLInputElement).style.width)
        }
      })
    }, 1000)
  }
}
