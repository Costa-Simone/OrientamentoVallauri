import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LabsService {
  labs:any[] = []

  constructor(protected dataStorage:DataStorageService) { }

  getLabs(){
    this.dataStorage.InviaRichiesta('get','/laboratori')?.subscribe({
      "next":(data) => {
        this.labs = data.recordsets[0]
        console.log(this.labs)
      },
      "error": (e) => {
        console.log(e)
      }
    })
  }
}
