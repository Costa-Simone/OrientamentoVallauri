import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { Gruppo } from '../models/gruppo.module';
import { StudentiService } from './studenti.service';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruppiService {
  gruppi: Gruppo[] = []
  selectedGruppo:Gruppo|undefined
  laboratori:any[] = []

  constructor(private dataStorage:DataStorageService, private studentiService:StudentiService) { }

  AddOrari(orari:any[]) {
    this.dataStorage.InviaRichiesta("post", "/orari", {orari: orari})?.subscribe({
      next: data => {
        console.log(data)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  async AddGruppi(groups:any[]) {
    let req = await firstValueFrom(this.dataStorage.InviaRichiesta("post", "/gruppi", {gruppi: groups})!)
    console.log(req)
  }

  async GetLaboratori() {
    this.dataStorage.InviaRichiesta("get", "/laboratori")?.subscribe({
      next: data => {
        this.laboratori = data["recordset"]
      },
      error: error => {
        console.log(error)
      }
    })
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
        console.log(error)
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
}
