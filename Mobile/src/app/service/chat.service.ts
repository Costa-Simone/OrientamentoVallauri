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
    // let users = { utente1: this.groupId, utente2: nChat }; --> da usare
    let users = { utente1: 'C01', utente2: '000' }; // --> da eliminare, lo uso così non ho da prendere ogni volta token da local storage

    return new Promise<void>((resolve, reject) => {
      this.dataStorageService
        .InviaRichiesta('GET', '/messaggiById', users)
        ?.subscribe({
          next: (data) => {
            this.currentChat = [];
            data['recordset'].forEach((element: any) => {
              this.currentChat.push(element);
            });
            console.log(this.currentChat);
            resolve();
          },
        });
    });
  }
}
