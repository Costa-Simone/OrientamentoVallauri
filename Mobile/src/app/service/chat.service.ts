import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private dataStorageService: DataStorageService) {}

  groupId: string = '';
  currentChat: any = [];

  getChat(nChat: string) {
    let users = { utente1: this.groupId, utente2: nChat };
    return new Promise<void>((resolve, reject) => {
      this.dataStorageService
        .InviaRichiesta('GET', '/messaggiById', users)
        ?.subscribe({
          next: (data) => {
            console.log(data);
            this.currentChat = [];
            data['recordset'].forEach((element: any) => {
              this.currentChat.push(element);
            });
            resolve();
          },
        });
    });
  }
}
