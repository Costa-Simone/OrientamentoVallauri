import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { Partecipante } from '../models/partecipante.module';

@Injectable({
  providedIn: 'root'
})
export class PartecipantiService {
  partecipanti:Partecipante[] = []

  constructor(private dataStorage:DataStorageService) { }

  GetPartecipanti() {
    this.dataStorage.InviaRichiesta("get", "/partecipanti")?.subscribe({
      next: data => {
        this.partecipanti = data["recordset"]
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
