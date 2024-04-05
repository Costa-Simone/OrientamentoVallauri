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
  public chatOpen: string = '';

  getChatList() {
    this.dataStorageService.inviaRichiesta('GET', '/Gruppi')?.subscribe({
      next: (data) => {
        data['recordset'].forEach((element: any) => {
          this.chatList.push(element);
        });

        console.log(this.chatList);
      },
    });
  }

  getLastMessage() {
    /*
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
      }); */
    this.lastMessages = [
      'ULTIMO MESSAGGIO CHAT 1',
      'ULTIMO MESSAGGIO CHAT 2',
      'ULTIMO MESSAGGIO CHAT 3',
    ];
  }

  getChat(nChat: string) {
    let users = { utente1: '000', utente2: nChat };
    console.log(users);

    this.dataStorageService
      .inviaRichiesta('GET', '/Messaggi', users)
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
    console.log(message);
    this.dataStorageService
      .inviaRichiesta('POST', '/nuovoMessaggio', { message })
      ?.subscribe({
        next: (data) => {
          console.log(data);
          this.getChat(message.IdDestinatario);
        },
      });
  }
}
