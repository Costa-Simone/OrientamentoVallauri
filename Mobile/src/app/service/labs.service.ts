import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LabsService {
  labs:any[] = []
  groupId:any
  groupNumber:number = 0
  labId:number = 0
  orarioPrevistoIngresso:any
  orarioEffettivoIngresso:any

  constructor(protected dataStorage:DataStorageService) { }

  logIn(code:any){
    return this.dataStorage.InviaRichiesta('get','/login',{pin:code})
  }

  getLabs(id:any){
    this.dataStorage.InviaRichiesta('get',`/laboratoriByGruppo/${id}`)?.subscribe({
      "next":(data) => {
        this.groupNumber = data.recordsets[0][data.recordsets[0].length-1].num_studenti
        data.recordsets[0].pop()
        this.labs = data.recordsets[0]
        console.log(this.labs)
      },
      "error": (e) => {
        console.log(e)
      }
    })
  }

  patchLabTime(url:string){
    // console.log("Sono qui")
    // console.log(url)
    return this.dataStorage.InviaRichiesta('patch',"/"+url,{IdLaboratorio:this.labId, IdGruppo: this.groupId ? this.groupId : localStorage.getItem('groupId')!})  
  }
}
