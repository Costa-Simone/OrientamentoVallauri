import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GruppiService } from '../../services/gruppi.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.css'
})
export class AddGroupComponent {
  selectedGroup: string = '';
  time:any

  constructor(private dialog:MatDialog, private gruppiService:GruppiService) { }

  ngOnInit() {
    if(this.gruppiService.gruppi.length == 0) {
      this.gruppiService.GetGruppi()
    }
  }
  
  async SaveGroup() {
    let endTime
    let aus = this.time.split(":")
    let orari:any[] = []
    let timeGruppo

    switch (this.selectedGroup) {
      case "C":
        aus[1] = parseInt(aus[1]) + 50

        if(aus[1] > 59) {
          aus[0] = parseInt(aus[0]) + 1
          aus[1] = aus[1] - 60
        }

        endTime = (aus[0] < 10 ? "0" + aus[0].toString() : aus[0]) + ":" + (aus[1] < 10 ? "0" + aus[1].toString() : aus[1])
        timeGruppo = 10
        break
      
      case "L":
        aus[1] = parseInt(aus[1]) + 70

        if(aus[1] > 59) {
          aus[0] = parseInt(aus[0]) + 1
          aus[1] = aus[1] - 60
        }
        
        endTime = (aus[0] < 10 ? "0" + aus[0].toString() : aus[0]) + ":" + (aus[1] < 10 ? "0" + aus[1].toString() : aus[1])
        timeGruppo = 20
        break

      case "T":
        aus[1] = parseInt(aus[1]) + 60

        if(aus[1] > 59) {
          aus[0] = parseInt(aus[0]) + 1
          aus[1] = aus[1] - 60
        }
        
        endTime = (aus[0] < 10 ? "0" + aus[0].toString() : aus[0]) + ":" + (aus[1] < 10 ? "0" + aus[1].toString() : aus[1])
        timeGruppo = 60
        break
      
      default:
        break
    }

    let groups = this.gruppiService.gruppi.filter(g => g.Id.includes(this.selectedGroup))
    groups.sort((a, b) => a.Id.localeCompare(b.Id))
    let id = (parseInt(groups[groups.length - 1].Id.split(this.selectedGroup)[1]) + 1)

    let group = {
      Id: this.selectedGroup + (id < 10 ? "0" + id.toString() : id.toString()),
      PIN: null,
      Orario: this.time,
      OrarioFine: endTime
    }

    this.gruppiService.AddGruppo(group)

    let groupAus = groups[groups.length - 1]
    let orariGroupAus = await this.gruppiService.GetOrariById(groupAus.Id)
    let count = 1
    let timeAus = group.Orario.split(":")
    
    orariGroupAus["recordset"].forEach((orario:any) => {
      let aus = timeAus

      aus[1] = parseInt(aus[1]) + (timeGruppo!)

      if(aus[1] > 59) {
        aus[0] = parseInt(aus[0]) + 1
        aus[1] = aus[1] - 60
      }

      orari.push({
        IdGruppo: group.Id,
        IdLaboratorio: orario.IdLaboratorio,
        OrarioPrevistoIngresso: (aus[0] < 10 ? "0" + aus[0].toString() : aus[0]) + ":" + (aus[1] < 10 ? "0" + aus[1].toString() : aus[1]),
        OrarioEffettivoIngresso: null,
      })
    })

    this.gruppiService.AddOrari(orari)
  }

  CloseDialog() {
    this.dialog.closeAll()
  }
}
