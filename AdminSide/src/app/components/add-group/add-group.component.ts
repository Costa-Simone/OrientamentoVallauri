import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GruppiService } from '../../services/gruppi.service';
import { group } from '@angular/animations';
import { Gruppo } from '../../models/gruppo.module';

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

  SaveGroup() {
    let endTime
    let aus = this.time.split(":")

    switch (this.selectedGroup) {
      case "C":
        aus[1] = parseInt(aus[1]) + 50

        if(aus[1] > 59) {
          aus[0] = parseInt(aus[0]) + 1
          aus[1] = aus[1] - 60
        }

        endTime = (aus[0] < 10 ? "0" + aus[0].toString() : aus[0]) + ":" + (aus[1] < 10 ? "0" + aus[1].toString() : aus[1])
        break
      
      case "L":
        aus[1] = parseInt(aus[1]) + 70

        if(aus[1] > 59) {
          aus[0] = parseInt(aus[0]) + 1
          aus[1] = aus[1] - 60
        }
        
        endTime = (aus[0] < 10 ? "0" + aus[0].toString() : aus[0]) + ":" + (aus[1] < 10 ? "0" + aus[1].toString() : aus[1])
        break

      case "T":
        aus[1] = parseInt(aus[1]) + 60

        if(aus[1] > 59) {
          aus[0] = parseInt(aus[0]) + 1
          aus[1] = aus[1] - 60
        }
        
        endTime = (aus[0] < 10 ? "0" + aus[0].toString() : aus[0]) + ":" + (aus[1] < 10 ? "0" + aus[1].toString() : aus[1])
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
  }

  CloseDialog() {
    this.dialog.closeAll()
  }
}
