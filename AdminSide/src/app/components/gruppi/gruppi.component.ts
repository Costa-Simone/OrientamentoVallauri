import { group } from '@angular/animations';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { GruppiService } from '../../services/gruppi.service';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupComponent } from '../add-group/add-group.component';

@Component({
  selector: 'app-gruppi',
  templateUrl: './gruppi.component.html',
  styleUrl: './gruppi.component.css'
})
export class GruppiComponent {
  
  constructor(public gruppiService:GruppiService, private dialog:MatDialog) { }

  ngOnInit() {
    this.gruppiService.GetLaboratori()
  }

  DeleteGroups() {
    this.gruppiService.DeleteGruppi()
  }

  AddGroup() {
    this.dialog.open(AddGroupComponent)
  }
  
  async AddGroups() {
    this.gruppiService.itisGroups.forEach((group: any) => {
      let aus = {
        Id: group["Informazioni_cronologiche"],
        PIN: null,
        Orario: group["__EMPTY_1"],
        OrarioFine: group["__EMPTY_12"]
      }

      this.gruppiService.groups.push(aus)
      let i = 2

      for(let key in group) {
        if(key != "Informazioni_cronologiche" && key != "__EMPTY_1" && key != "__EMPTY_12" && key != "__EMPTY" 
        && key != "Informazioni  cronologiche" && key != "__EMPTY_13" && key != "__EMPTY_14") {
          let orario = {
            IdGruppo: group["Informazioni_cronologiche"],
            IdLaboratorio: this.gruppiService.laboratori.find(lab => lab.Nome == this.gruppiService.itisLab[i]).Id,
            OrarioPrevistoIngresso: group[key],
            OrarioEffettivoIngresso: null
          }

          this.gruppiService.orari.push(orario)
          i++
        }
      }
    })

    this.gruppiService.liceoGroups.forEach((group: any) => {
      let aus = {
        Id: group["Informazioni_cronologiche"],
        PIN: null,
        Orario: group["__EMPTY_1"],
        OrarioFine: group["__EMPTY_5"]
      }

      this.gruppiService.groups.push(aus)
      let i = 2
      console.log(this.gruppiService.liceoLab)
      for(let key in group) {
        if(key != "Informazioni_cronologiche" && key != "__EMPTY_1" && key != "__EMPTY_5" && key != "__EMPTY_6" 
        && key != "__EMPTY_7" && key != "__EMPTY" && key != "Informazioni  cronologiche") {
          let orario = {
            IdGruppo: group["Informazioni_cronologiche"],
            IdLaboratorio: this.gruppiService.laboratori.find(lab => lab.Nome == this.gruppiService.liceoLab[i]).Id,
            OrarioPrevistoIngresso: group[key],
            OrarioEffettivoIngresso: null
          }

          console.log(this.gruppiService.laboratori.find(lab => lab.Nome == this.gruppiService.liceoLab[i]))

          this.gruppiService.orari.push(orario)
          i++
        }
      }
    })

    this.gruppiService.tesauroGroups.forEach((group: any) => {
      let aus = {
        Id: group["Informazioni_cronologiche"],
        PIN: null,
        Orario: group["__EMPTY_1"],
        OrarioFine: group["__EMPTY_5"]
      }

      this.gruppiService.groups.push(aus)
      let i = 2
      console.log(group)
      for(let key in group) {
        if(key != "Informazioni_cronologiche" && key != "__EMPTY_1" && key != "__EMPTY_5" && key != "__EMPTY_6" 
        && key != "__EMPTY_7" && key != "__EMPTY" && key != "Informazioni  cronologiche") {
          let orario = {
            IdGruppo: group["Informazioni_cronologiche"],
            IdLaboratorio: this.gruppiService.laboratori.find(lab => lab.Nome == this.gruppiService.tesauroGroups[i]).Id,
            OrarioPrevistoIngresso: group[key],
            OrarioEffettivoIngresso: null
          }

          this.gruppiService.orari.push(orario)
          i++
        }
      }
    })

    await this.gruppiService.AddGruppi(this.gruppiService.groups)
    this.gruppiService.AddOrari(this.gruppiService.orari)

    this.gruppiService.SvuotaGruppi()
  }
  
  OnFileChange(event: any) {
    this.gruppiService.importedGroups = []
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      // console.log(XLSX.utils.sheet_to_json(ws))
      /* save data */
      (document.getElementById("inputFileGruppi") as HTMLInputElement).value = ""
      this.CreateGroups(XLSX.utils.sheet_to_json(ws)) // to get 2d array pass 2nd parameter as object {header: 1}
    };
  }
  
  CreateGroups(groups: any) {
    groups.forEach((group: any) => {
      group["Informazioni_cronologiche"] = group["Informazioni  cronologiche"]
    })

    groups.forEach((group: any) => {
      for(let key in group) {
        if(key != "Informazioni_cronologiche" && key != "__EMPTY" && group["Informazioni_cronologiche"] != "GRUPPO") {
          let date = new Date(((group[key] - (25567 + 1)) * 86400 * 1000) - 3600000)
          let hour = date.getHours().toString().length == 1 ? "0" + date.getHours() : date.getHours()
          let minutes = date.getMinutes().toString().length == 1 ? "0" + date.getMinutes() : date.getMinutes()

          group[key] =  hour + ":" + minutes
        }
      }

      if(group["Informazioni_cronologiche"] != "GRUPPO" && group["Informazioni_cronologiche"] != undefined 
        && !group["Informazioni_cronologiche"].includes("SEDE")) {
        if(group["Informazioni_cronologiche"].length == 2) {
          let aus = group["Informazioni_cronologiche"]

          group["Informazioni_cronologiche"] = aus[0] + "0" + aus[1]
        }

        if(group["Informazioni_cronologiche"].includes("C")) {
          this.gruppiService.itisGroups.push(group)
        } else if(group["Informazioni_cronologiche"].includes("L")) {
          this.gruppiService.liceoGroups.push(group)
        } else {
          this.gruppiService.tesauroGroups.push(group)
        }
      }

      if(group["Informazioni_cronologiche"] == "GRUPPO") {
        let pos = groups.indexOf(group) +  1

        if(groups[pos]["Informazioni_cronologiche"].includes("C")) {
          for(let key in group) {
            if(key != "Informazioni_cronologiche" && key != "__EMPTY") {
              this.gruppiService.itisLab.push(group[key])
            }
          }
        } else if(groups[pos]["Informazioni_cronologiche"].includes("L")) {
          for(let key in group) {
            if(key != "Informazioni_cronologiche" && key != "__EMPTY") {
              this.gruppiService.liceoLab.push(group[key])
            }
          }
        } else {
          for(let key in group) {
            if(key != "Informazioni_cronologiche" && key != "__EMPTY") {
              this.gruppiService.tesauroLab.push(group[key])
            }
          }
        }
      }
    })

    this.gruppiService.importedGroups = groups
  }
}
