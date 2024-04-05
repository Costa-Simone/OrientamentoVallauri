import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { Gruppo } from '../models/gruppo.module';
import { StudentiService } from './studenti.service';

@Injectable({
  providedIn: 'root'
})
export class GruppiService {
  gruppi: Gruppo[] = []
  selectedGruppo:Gruppo|undefined

  constructor(private dataStorage:DataStorageService, private studentiService:StudentiService) { }

  GetGruppo(id:string) {
    this.dataStorage.InviaRichiesta("get", "/Gruppi/" + id)?.subscribe({
      next: async data => {
        this.selectedGruppo = await data["recordset"][0]
        this.studentiService.GetStudentiByGruppo(this.selectedGruppo?.Id!)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  GetGruppi() {
    this.dataStorage.InviaRichiesta("get", "/Gruppi")?.subscribe({
      next: data => {
        this.gruppi = data["recordset"]
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
