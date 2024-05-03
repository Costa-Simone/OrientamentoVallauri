import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LabsService {
  labs:any[] = []
  groupId:any

  constructor(protected dataStorage:DataStorageService) { }

  logIn(code:any){
    return this.dataStorage.InviaRichiesta('get','/login',{pin:code})
  }

  getLabs(id:any){
    this.dataStorage.InviaRichiesta('get',`/laboratoriByGruppo/${id}`)?.subscribe({
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
