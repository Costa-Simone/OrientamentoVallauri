import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private dataStorageService: DataStorageService) {}

  isChatOpen: boolean = false;

  public chatList: any = [];
  public currentChat: any = [];
  public lastMessages: any = [];

  getChatList() {
    this.dataStorageService.inviaRichiesta('GET', '/gruppi')?.subscribe({
      next: (data) => {
        data['recordset'].forEach((element: any) => {
          this.chatList.push(element);
        });

        console.log(this.chatList);
      },
    });
  }

  getLastMessage() {
    this.dataStorageService
      .inviaRichiesta('GET', '/ultimoMessaggio')
      ?.subscribe({
        next: (data) => {
          console.log(data);
          data['recordset'].forEach((element: any) => {
            this.lastMessages.push(element);
          });
          console.log(this.lastMessages);
        },
      });
  }

  getChat(nChat: number) {
    let users = { utente1: '000', utente2: nChat.toString() };
    console.log(users);

    this.dataStorageService
      .inviaRichiesta('GET', '/messaggi', users)
      ?.subscribe({
        next: (data) => {
          this.currentChat = [];
          data['recordset'].forEach((element: any) => {
            this.currentChat.push(element);
          });
          console.log(this.currentChat);
        },
      });
  }

  sendMessage(message: any) {
    this.dataStorageService.inviaRichiesta('POST', '/sendMessage', message);
  }
}
