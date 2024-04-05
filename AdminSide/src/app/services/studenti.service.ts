import { Injectable } from '@angular/core';
import { Studente } from '../models/studente.module';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StudentiService {
  studenti: Studente[] = []
  selectedStudente: any = null;

  constructor(private dataStorage:DataStorageService) { }

  GetStudentiByGruppo(gruppo:string) {
    this.dataStorage.InviaRichiesta("get", "/studenti", {gruppo:gruppo})?.subscribe({
      next: data => {
        this.studenti = data["recordset"]
      }, 
      error: error => {
        console.log(error)
      }
    })
  }

  GetStudenti() {
    this.dataStorage.InviaRichiesta("get", "/studenti")?.subscribe({
      next: data => {
        this.studenti = data["recordset"]
        console.log(this.studenti)
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
