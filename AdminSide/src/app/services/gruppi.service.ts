import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { Gruppo } from '../models/gruppo.module';
import { StudentiService } from './studenti.service';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Notifica } from '../models/notifica.module';
import { NotificheService } from './notifiche.service';

@Injectable({
  providedIn: 'root'
})
export class GruppiService {
  gruppi: Gruppo[] = []
  selectedGruppo:Gruppo|undefined
  laboratori:any[] = []
  selectedIndirizzo:string = "C"
  selectedIndirizzoLab:string = "C"
  importedGroups: any[] = []
  itisGroups: any[] = []
  tesauroGroups: any[] = []
  liceoGroups: any[] = []
  itisLab: any[] = []
  tesauroLab:any[] = []
  liceoLab:any[] = []
  groups:any[] = []
  orari:any[] = []
  orariLab:any[] = []

  constructor(private dataStorage:DataStorageService, private studentiService:StudentiService, private dialog:MatDialog, 
    private notificheService:NotificheService) { }

  DeleteGruppi() {
    Swal.fire({
      title: 'Sei sicuro di voler eliminare tutti i gruppi e i loro riferimenti?',
      showDenyButton: true,
      icon: "warning",
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        let nt:Notifica = {
          titolo: "Eliminazione gruppi",
          descrizione: "I gruppi sono stati eliminati correttamente",
          tipo: "info"
        }
        
        this.notificheService.NuovaNotifica(nt)
    
        this.dataStorage.InviaRichiesta("delete", "/gruppi")?.subscribe({
          next: data => {
            this.SvuotaGruppi()
          },
          error: error => {
            this.SvuotaGruppi()
          }
        })  
      }
    })
  }

  async GetOrariByLab(lab:string) {
    try {
      const data = await firstValueFrom(this.dataStorage.InviaRichiesta("get", "/orariByLab/" + lab)!);
      this.orariLab = data["recordset"];
    } catch (error) {
      console.log(error);
    }
  }

  async GetOrariById(id:string) {
    let data = await firstValueFrom(this.dataStorage.InviaRichiesta("get", "/orari/" + id)!)
    return data
  }
  
  AddGruppo(gruppo:any) {
    this.dataStorage.InviaRichiesta("post", "/aggiungiGruppo", {gruppo: gruppo})?.subscribe({
      next: data => {
        let nt:Notifica = {
          titolo: "Aggiunta gruppo",
          descrizione: "Il gruppo " + gruppo.Id + " è stato aggiunto correttamente",
          tipo: "info"
        }
        
        this.notificheService.NuovaNotifica(nt)
        
        this.SvuotaGruppi()
        this.GetGruppi()
        this.dialog.closeAll()
      },
      error: error => {
        this.SvuotaGruppi()
      }
    })
  }
  
  AddOrari(orari:any[]) {
    this.dataStorage.InviaRichiesta("post", "/orari", {orari: orari})?.subscribe({
      next: data => {
        this.SvuotaGruppi()
      },
      error: error => {
        this.SvuotaGruppi()
      }
    })
  }

  async AddGruppi(groups:any[]) {
    let req = await firstValueFrom(this.dataStorage.InviaRichiesta("post", "/gruppi", {gruppi: groups})!).catch(err => {
      this.SvuotaGruppi()
    })

    let nt:Notifica = {
      titolo: "Aggiunta gruppi",
      descrizione: "Sono stati aggiunti correttamente " + groups.length + " gruppi",
      tipo: "info"
    }
    
    this.notificheService.NuovaNotifica(nt)
  }

  async GetLaboratori() {
    try {
      const data = await firstValueFrom(this.dataStorage.InviaRichiesta("get", "/laboratori")!);
      this.laboratori = data["recordset"];
    } catch (error) {
      console.log(error);
    }
  }

  async CreatePin() {
    const pin = this.generatePIN()
    let rq = await firstValueFrom(this.dataStorage.InviaRichiesta("post", "/pinGruppo/" + this.selectedGruppo?.Id, {pin: pin})!)

    Swal.fire({
      title: "PIN del gruppo " + this.selectedGruppo?.Id,
      html: `
        <b>${pin}</b>
      `,
    })
  }

  generatePIN() {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let pin: string = '';
  
    for (let i = 0; i < 12; i++) {
      pin += characters[Math.floor(Math.random() * characters.length)];
    }

    return pin;
  }
  

  GetGruppo(id:string) {
    this.dataStorage.InviaRichiesta("get", "/gruppi/" + id)?.subscribe({
      next: async data => {
        this.selectedGruppo = await data["recordset"][0]
        this.studentiService.GetStudentiByGruppo(this.selectedGruppo?.Id!)
      },
      error: error => {
        if(error.status == 403) {
          
        }
      }
    })
  }

  GetGruppi() {
    this.dataStorage.InviaRichiesta("get", "/gruppi")?.subscribe({
      next: data => {
        this.gruppi = data["recordset"]
      },
      error: error => {
        console.log(error)
      }
    })
  }

  SvuotaGruppi() {
    this.importedGroups = []
    this.itisGroups = []
    this.tesauroGroups = []
    this.liceoGroups = []
    this.itisLab = []
    this.tesauroLab = []
    this.liceoLab = []
    this.groups = []
    this.orari = []
  }
}
