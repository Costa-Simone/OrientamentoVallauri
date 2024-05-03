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

  AddStudents(students:Studente[]) {
    this.dataStorage.InviaRichiesta("post", "/aggiungiStudenti", {students: students})?.subscribe({
      next: data => {
        this.GetStudenti()
      },
      error: err => {
        console.log(err)
      }
    })
  }
  
  EditStudentGroup(studente:Studente, newGruppo:string, oldGruppo:string) {
    this.dataStorage.InviaRichiesta("post", "/gruppoStudente", {gruppo: newGruppo, studente: studente.Id})?.subscribe({
      next: data => {
        this.GetStudentiByGruppo(oldGruppo)
      },
      error: err => {
        console.log(err)
      }
    })
  }
  
  EditStudentPresent(studente:Studente, idGruppo:string) {
    this.dataStorage.InviaRichiesta("post", "/presenza/" + studente.Id, {isPresente: !studente.isPresente})?.subscribe({
      next: data => {
        this.GetStudentiByGruppo(idGruppo)
      },
      error: err => {
        console.log(err)
      }
    })
  }

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
