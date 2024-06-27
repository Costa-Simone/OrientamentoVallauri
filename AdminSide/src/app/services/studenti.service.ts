import { Injectable } from '@angular/core';
import { Studente } from '../models/studente.module';
import { DataStorageService } from './data-storage.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Notifica } from '../models/notifica.module';
import { NotificheService } from './notifiche.service';

@Injectable({
  providedIn: 'root'
})
export class StudentiService {
  studenti: Studente[] = []
  selectedStudente: any = null;
  importedStudents: any[] = []
  groups: any[] = []

  constructor(private dataStorage:DataStorageService, private router:Router, private dialog:MatDialog, private notificheService:NotificheService) { }

  DeleteStudenti() {
    Swal.fire({
      title: 'Eliminazione studenti',
      text: 'Sei sicuro di voler eliminare tutti gli studenti?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        let nt:Notifica = {
          titolo: "Eliminazione studenti",
          descrizione: "Gli studenti sono stati eliminati correttamente",
          tipo: "info"
        }
        
        this.notificheService.NuovaNotifica(nt)
    
        this.dataStorage.InviaRichiesta("delete", "/studenti")?.subscribe({
          next: data => {
            let nt:Notifica = {
              titolo: "Eliminazione studenti",
              descrizione: "Gli studenti sono stati eliminati correttamente",
              tipo: "info"
            }
            
            this.notificheService.NuovaNotifica(nt)
          },
          error: err => {
            let nt:Notifica = {
              titolo: "Eliminazione studenti",
              descrizione: "Errore nell'eliminazione degli studenti",
              tipo: "warning"
            }
            
            this.notificheService.NuovaNotifica(nt)
          }
        })  
      }
    })
  }

  AddStudent(student:Partial<Studente>) {
    this.dataStorage.InviaRichiesta("post", "/aggiungiStudente", {studente: student})?.subscribe({
      next: data => { 
        let nt:Notifica = {
          titolo: "Aggiunta studente",
          descrizione: "Lo studente " + student.Nominativo + " è stato aggiunto correttamente",
          tipo: "info"
        }
        
        this.notificheService.NuovaNotifica(nt)

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
    let nt:Notifica = {
      titolo: "Aggiunta studenti",
      descrizione: "Sono stati aggiunti correttamente " + students.length + " studenti",
      tipo: "info"
    }
    
    this.notificheService.NuovaNotifica(nt)

    this.dataStorage.InviaRichiesta("post", "/aggiungiStudenti", {students: students})?.subscribe({
      next: data => {
        let nt:Notifica = {
          titolo: "Aggiunta studenti",
          descrizione: "Sono stati aggiunti correttamente " + students.length + " studenti",
          tipo: "info"
        }
        
        this.notificheService.NuovaNotifica(nt)

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

        let nt:Notifica = {
          titolo: "Modifica studente",
          descrizione: "Il gruppo dello studente " + studente.Nominativo + " è stato modificato da " + oldGruppo + " a " + newGruppo,
          tipo: "info"
        }
    
        this.notificheService.NuovaNotifica(nt)
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
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
