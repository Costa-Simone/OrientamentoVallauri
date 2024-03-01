import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GruppiService {
  gruppi: any[] = []
  selectedGruppo: any = null;

  constructor(private dataStorage:DataStorageService) { }

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
