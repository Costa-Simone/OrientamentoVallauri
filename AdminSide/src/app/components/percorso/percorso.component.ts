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
          let orario = this.gruppiService.orariLab.find(orario => orario["IdGruppo"] == lab["IdGruppo"] && orario.IdLaboratorio == lab.Id)
          
          if(orario["OrarioEffettivoIngresso"]) {
            let aus = orario["OrarioEffettivoIngresso"].split(":")
          
            let h = parseInt(aus[0]) 
            let m = parseInt(aus[1])
            let time = 0;
            let ausTime = new Date().toLocaleTimeString().split(":")
  
            switch(this.gruppiService.selectedIndirizzoLab) {
              case "C":
                time = 10
                break
  
              case "L":
                time = 20
                break
            }
  
            // x : 100 = ausTime - m : time
            // 11:00 -> 11:10
            // 10:55 -> 11:05
            let x = (100 * (parseInt(ausTime[1]) - m)) / time;
  
            if(orario.IdGruppo == "C01" && lab.Nome == "FISICA") {
              console.log(orario)
              console.log(this.gruppiService.orariLab)
            }
            
            (document.getElementById(lab["Id"] + lab["IdGruppo"]) as HTMLInputElement).style.width = x + "%"
  
            if(x > 100) {
              (document.getElementById(lab["Id"] + lab["IdGruppo"]) as HTMLInputElement).style.backgroundColor = "red";
              (document.getElementById(lab["Id"] + lab["IdGruppo"] + "Alert") as HTMLHtmlElement).textContent = "Gruppo in ritardo!"
            } else {
              (document.getElementById(lab["Id"] + lab["IdGruppo"]) as HTMLInputElement).style.backgroundColor = "green";
              (document.getElementById(lab["Id"] + lab["IdGruppo"] + "Alert") as HTMLHtmlElement).textContent = ""
            }
          }
        }
      })
    }, 1000)
  }
}
