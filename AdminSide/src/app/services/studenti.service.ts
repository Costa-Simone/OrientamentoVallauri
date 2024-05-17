import { Injectable } from '@angular/core';
import { Studente } from '../models/studente.module';
import { DataStorageService } from './data-storage.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class StudentiService {
  studenti: Studente[] = []
  selectedStudente: any = null;
  importedStudents: any[] = []
  groups: any[] = []

  constructor(private dataStorage:DataStorageService, private router:Router, private dialog:MatDialog) { }

  AddStudent(student:Partial<Studente>) {
    this.dataStorage.InviaRichiesta("post", "/aggiungiStudente", {studente: student})?.subscribe({
      next: data => { 
        this.dialog.closeAll()
        this.GetStudenti()
        this.router.navigateByUrl("home")
      },
      error: err => {
        Swal.fire({
          title: 'Errore',
          text: 'Errore durante l\'aggiunta dello studente',
          icon: 'error'
        })
        this.importedStudents = []
        this.groups = []
      }
    })
  }
  
  AddStudents(students:Studente[]) {
    this.dataStorage.InviaRichiesta("post", "/aggiungiStudenti", {students: students})?.subscribe({
      next: data => {
        Swal.fire({
          title: 'Studenti aggiunti con successo',
          icon: 'success'
        })
        this.GetStudenti()
      },
      error: err => {
        Swal.fire({
          title: 'Errore',
          text: 'Errore durante l\'aggiunta degli studenti',
          icon: 'error'
        })

        this.importedStudents = []
        this.groups = []
      }
    })
  }
  
  EditStudentGroup(studente:Studente, newGruppo:string, oldGruppo:string) {
    this.dataStorage.InviaRichiesta("post", "/gruppoStudente", {gruppo: newGruppo, studente: studente.Id, oldGruppo: oldGruppo})?.subscribe({
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
