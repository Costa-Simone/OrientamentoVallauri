import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private dataStorageService: DataStorageService) {}

  groupId: string = '';
  currentChat: any = [];
  chatOpened: string = '';

  getChat() {
    let users = { utente1: this.groupId, utente2: this.chatOpened };

    console.log(users);
    return new Promise<void>((resolve, reject) => {
      this.dataStorageService
        .InviaRichiesta('GET', '/messaggiById', users)
        ?.subscribe({
          next: (data) => {
            this.currentChat = [];
            data['recordset'].forEach((element: any) => {
              this.currentChat.unshift(element);
            });
            console.log(this.currentChat);
            resolve();
          },
        });
    });
  }
}